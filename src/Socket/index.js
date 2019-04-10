import store from '../store'
import api from '../api'
import parse from './parse'

class Socket {
  constructor() {
    this.connected = false
  }
  connect = async host => {
    return new Promise(resolve => {
      this.ws = new WebSocket(`ws://${host}`)

      this.ws.addEventListener('open', () => {
        this.connected = true
        resolve()
      })

      this.ws.addEventListener('message', this.handleMessage)
      this.ws.addEventListener('error', this.handleError)
      this.ws.addEventListener('close', this.handleClose)
    })
  }
  handleMessage = ({ data }) => {
    const [key, payload] = data.split('/')

    if (store[key] === undefined) {
      console.warn(`Unhandled message: ${key}`)
      return
    }

    const config = api[key]
    const parsed = parse(payload, config)

    // Primitive value
    if (!config.class && !config.isArray) {
      store[key] = parsed
      return
    }

    // Complex value
    if (!config.isArray) {
      throw new Error(`Cannot parse: ${key}`)
    }

    // Array of primitive values
    if (!config.class) {
      store[key] = parsed
      return
    }

    // Array of complex values
    for (let i = 0; i < parsed.length; i++) {
      const fields = parsed[i]
      const keys = Object.keys(fields)
      const item = store.getItem(key, fields.id)

      if (item) {
        for (let j = 0; j < keys.length; j++) {
          store.updateItem(key, fields.id, {
            key: keys[j],
            value: fields[keys[j]],
          })
        }
      } else {
        for (let j = 0; j < keys.length; j++) {
          if (fields[keys[j]] === undefined) {
            throw new Error(`${key}: ${keys[j]} is undefined`)
          }
        }

        const item = new config.class(parsed[i])

        if (!item.id) continue

        store.addItem(key, item)
      }
    }

    if (store.changeHandlers[key]) {
      store.changeHandlers[key](store[key])
    }
  }
  handleError = event => {
    console.error(`Socket error!`)
    console.error(event)
  }
  handleClose = () => {
    this.connected = false
    console.log('Socket closed.')
  }
  send = (message, payload) => {
    this.ws.send(`${message}/${payload}`)
  }
  close = () => {
    this.ws.close()
  }
}

export default Socket
