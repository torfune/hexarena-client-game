import { observable } from 'mobx'
import GameServerConfig from './types/GameServerConfig'
import ChatMessage from './types/ChatMessage'
import TopPlayer from './types/TopPlayer'
import RunningGame from './types/RunningGame'
import Game from './game/classes/Game'
import { History } from 'history'
import User from './models/User'
import Api from './Api'
import FinishedGame from './types/FinishedGame'
import getWsHost from './utils/getWsHost'

class Store {
  @observable chatFocus: boolean = false
  @observable matchFound: boolean = false
  @observable chatMessage: string = ''
  @observable topPlayers: TopPlayer[] = []
  @observable chatMessages: ChatMessage[] = []
  @observable spectating: boolean = false
  @observable gsConfig?: GameServerConfig
  @observable runningGames: RunningGame[] = []
  @observable finishedGames: FinishedGame[] = []
  @observable loading: boolean = true
  @observable openingTime: number | null = null
  @observable game: Game | null = null
  @observable user: User | null = null
  @observable waitingTime: {
    current: number
    average: number
    players: number
  } | null = null
  @observable error?: {
    message: string
    goHome?: boolean
  }
  @observable queueSettings: {
    normal: boolean
    ranked: boolean
  } = {
    normal: localStorage.getItem('queueNormal') === 'true',
    ranked: localStorage.getItem('queueRanked') === 'true',
  }
  routerHistory: History | null = null
  gsHost: string | null = null

  constructor() {
    if (!this.queueSettings.normal && !this.queueSettings.ranked) {
      this.setQueueSettings({ normal: true, ranked: true })
    }
  }

  async fetchRunningGames() {
    const { data } = await Api.gs.get('/running-games')
    if (!data) return

    store.runningGames = [...data].sort((a, b) => {
      let eloSumA = 0
      for (const players of a.players) {
        for (const player of players) {
          if (player.elo) {
            eloSumA += player.elo
          }
        }
      }

      let eloSumB = 0
      for (const players of b.players) {
        for (const player of players) {
          if (player.elo) {
            eloSumB += player.elo
          }
        }
      }

      return eloSumB - eloSumA
    })
  }

  async fetchFinishedGames() {
    const { data } = await Api.gs.get('/finished-games')
    if (!data) return

    store.finishedGames = data
  }

  setQueueSettings(queueSettings: { normal: boolean; ranked: boolean }) {
    this.queueSettings = queueSettings
    localStorage.setItem('queueNormal', String(queueSettings.normal))
    localStorage.setItem('queueRanked', String(queueSettings.ranked))
  }
}

const store = new Store()

export default store
