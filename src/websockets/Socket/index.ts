import store from '../../store'
import messages from '../messages'
import parse from './parse'
import Action from '../../game/classes/Action'
import AllianceRequest from '../../game/classes/AllianceRequest'
import Army from '../../game/classes/Army'
import Player from '../../game/classes/Player'
import Tile from '../../game/classes/Tile'
import createInstance from '../../utils/createInstance'
import parseRunningGames from '../../utils/parseRunningGames'

class Socket {
  static connected: boolean = false
  static ws?: WebSocket

  static connect(host: string) {
    return new Promise(resolve => {
      this.ws = new WebSocket(`ws://${host}`)

      this.ws.addEventListener('message', this.handleMessage)
      this.ws.addEventListener('error', this.handleError)
      this.ws.addEventListener('close', this.handleClose)
      this.ws.addEventListener('open', () => {
        this.connected = true
        console.log(`Connected to the GameServer [${host}]`)
        resolve()
      })
    })
  }
  static handleMessage({ data }: { data: string }) {
    const [key, payload] = data.split('//')

    // Start game
    if (key === 'startGame') {
      console.log(`WS: startGame`)
      if (!store._game) {
        store.createGame()
      }
      store.waitingTime = null
      store.routerHistory.push('/game')
      return
    }

    // Running games
    if (key === 'runningGames') {
      store.runningGames = parseRunningGames(payload)
      return
    }

    // Unknown message name
    if (!Object.keys(messages).includes(key)) {
      console.warn(`Unhandled message: ${key}`)
      return
    }

    // Parse
    const config = messages[key]
    const parsed = parse(payload, config)

    // Null value
    if (parsed === null && key !== 'startCountdown') {
      throw Error(`Cannot parse: ${key}`)
    }

    // Primitive value
    if (!config.instance && !config.isArray) {
      setStoreValue(key, parsed)

      // const { pathname } = window.location
      // console.log(pathname)

      // // Status / -> /game
      // if (
      //   key === 'status' &&
      //   (parsed === 'starting' || parsed === 'running') &&
      //   !store.spectating &&
      //   pathname === '/'
      // ) {
      //   store.waitingTime = null
      //   store.routerHistory.push('/game')
      // }

      // // Status /spectate -> /game
      // if (
      //   key === 'status' &&
      //   (parsed === 'starting' || parsed === 'running') &&
      //   store.spectating &&
      //   window.location.pathname === '/spectate'
      // ) {
      //   // if (store._game) {
      //   //   store._game.destroy()
      //   // }

      //   store.waitingTime = null
      //   store.routerHistory.push('/game')
      // }

      return
    }

    // Complex value
    if (!config.isArray || !(parsed instanceof Array)) {
      throw new Error(`Cannot parse: ${key}`)
    }

    // Array of primitive values
    if (!config.instance) {
      setStoreValue(key, parsed)
      return
    }

    // Array of complex values
    const ids: string[] = []
    for (let i = 0; i < parsed.length; i++) {
      const fields = parsed[i]
      const keys = Object.keys(fields)
      const id = fields.id

      let item: Army | AllianceRequest | Action | Player | Tile | null
      switch (key) {
        case 'actions':
          item = store.getAction(id)
          break
        case 'allianceRequests':
          item = store.getAllianceRequest(id)
          break
        case 'armies':
          item = store.getArmy(id)
          break
        case 'players':
          item = store.getPlayer(id)
          break
        case 'tiles':
          item = store.getTile(id)
          break
        default:
          throw new Error(`Cannot parse: ${key}`)
      }

      ids.push(id)

      if (!item) {
        for (let j = 0; j < keys.length; j++) {
          if (fields[keys[j]] === undefined) {
            throw Error(`${key}: ${keys[j]} is undefined`)
          }
        }

        item = createInstance(key, parsed[i])
        if (!item) {
          console.log(
            `Coulnd't create an instance (${key}) [${Object.entries(
              parsed[i]
            )}]`
          )
          return
        }

        switch (key) {
          case 'actions':
            if (item instanceof Action) {
              store.actions.push(item)
            }
            break
          case 'allianceRequests':
            if (item instanceof AllianceRequest) {
              store.allianceRequests.push(item)
            }
            break
          case 'armies':
            if (item instanceof Army) {
              store.armies.push(item)
            }
            break
          case 'players':
            if (item instanceof Player) {
              store.players.push(item)
            }
            break
          case 'tiles':
            if (item instanceof Tile) {
              store.addTile(item)
            }
            break
        }
      }

      // Update
      for (let j = 0; j < keys.length; j++) {
        const prop = keys[j]
        const value = fields[prop]

        if (!Object.keys(item.props).includes(prop)) continue
        if (item.props[prop].current === value) continue

        switch (key) {
          case 'actions':
            store.updateAction(id, prop, value)
            break
          case 'allianceRequests':
            store.updateAllianceRequest(id, prop, value)
            break
          case 'armies':
            store.updateArmy(id, prop, value)
            break
          case 'players':
            store.updatePlayer(id, prop, value)
            break
          case 'tiles':
            store.updateTile(id, prop, value)
            break
        }
      }
    }

    // Auto destroy
    if (config.autoDestroy) {
      let collection: Player[] | AllianceRequest[] | OnlinePlayer[]
      let remove: (id: string) => void

      switch (key) {
        case 'players':
          collection = store.players
          remove = store.removePlayer.bind(store)
          break
        case 'allianceRequests':
          collection = store.allianceRequests
          remove = store.removeAllianceRequest.bind(store)
          break
        default:
          throw Error(`Unhandled auto-destroy: ${key}`)
      }

      for (let i = collection.length - 1; i >= 0; i--) {
        const { id } = collection[i]
        if (!ids.includes(id)) {
          remove(id)
        }
      }
    }

    // Change handlers
    if (store.changeHandlers[key]) {
      switch (key) {
        case 'tiles':
          store.changeHandlers[key]()
          break

        case 'actions':
          store.changeHandlers[key]()
          break

        default:
          throw Error(`Unsupported store listener: ${key}`)
      }
    }
  }
  static handleError(event: Event) {
    console.error(`Socket error!`)
    console.error(event)
  }
  static handleClose() {
    this.connected = false
    console.log('Socket closed.')

    store.error = {
      message: 'Disconnected.',
      goHome: false,
    }
  }
  static send(message: string, payload?: string) {
    if (this.ws) {
      this.ws.send(`${message}//${payload}`)
    }
  }
}

const setStoreValue = (key: string, value: any) => {
  switch (key) {
    case 'gameTime':
      if (typeof value !== 'number') {
        throw Error(typeError(key, value))
      }
      store.gameTime = value
      break
    case 'serverTime':
      if (typeof value !== 'number') {
        throw Error(typeError(key, value))
      }
      store.serverTime = value
      break
    case 'waitingTime':
      if (typeof value !== 'object') {
        throw Error(typeError(key, value))
      }
      store.waitingTime = value
      break
    case 'goldAnimation':
      if (typeof value !== 'object') {
        throw Error(typeError(key, value))
      }
      store.goldAnimation = value
      break
    case 'flash':
      store.flash = value
      break
    case 'notification':
      store.notification = value
      break
    case 'gameIndex':
      store.gameIndex = value
      break
    case 'playerId':
      if (typeof value !== 'string') {
        throw Error(typeError(key, value))
      }
      store.playerId = value
      break
    case 'status':
      if (
        typeof value !== 'string' ||
        (value !== 'starting' &&
          value !== 'running' &&
          value !== 'finished' &&
          value !== 'aborted')
      ) {
        throw Error(typeError(key, value))
      }
      store.status = value
      break
    case 'gameMode':
      if (
        typeof value !== 'string' ||
        (value !== 'diplomacy' && value !== 'ffa')
      ) {
        throw Error(typeError(key, value))
      }
      store.gameMode = value
      break
    case 'chatMessages':
      store.chatMessages = value
      break
    case 'onlinePlayers':
      store.onlinePlayers = value
      break
    case 'alreadyPlaying':
      break
    case 'startCountdown':
      if (typeof value !== 'number' && value !== null) {
        throw Error(typeError(key, value))
      }
      store.startCountdown = value
      break
    default:
      throw Error(`Can't set store property ${key}`)
  }

  if (store.changeHandlers[key]) {
    switch (key) {
      case 'serverTime':
        store.changeHandlers[key]()
        break

      case 'goldAnimation':
        store.changeHandlers[key]()
        break
    }
  }
}

const typeError = (key: string, value: any) => {
  return `Invalid value type of ${key}:\nvalue: ${value}\ntype: ${typeof value}`
}

export default Socket
