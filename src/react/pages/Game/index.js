import React from 'react'
import styled from 'styled-components'
import Actions from './hud/Actions'
import HoverPreview from './hud/HoverPreview'
import Leaderboard from './hud/Leaderboard'
import NamePreview from './hud/NamePreview'
import Time from './hud/Time'
import Wood from './hud/Wood'
import YourEmpire from './hud/YourEmpire'
import DefeatScreen from './screens/DefeatScreen'
import ErrorScreen from './screens/ErrorScreen'
import TimesUpScreen from './screens/TimesUpScreen'
import WaitingScreen from './screens/WaitingScreen'
import WinScreen from './screens/WinScreen'
import {
  selectPattern,
  sendMessage,
  startGame,
  stopGame,
  updateScreenSize,
} from '../../../game'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

class Game extends React.Component {
  state = {
    messages: [],
    players: [],
    connectionError: false,
    defeated: false,
    isWinner: false,
    timesUp: false,
    actionQueue: null,
    countdownSeconds: null,
    finishSeconds: null,
    hoveredStructure: null,
    hoveredTileInfo: null,
    killerName: null,
    minPlayers: null,
    namePreview: null,
    player: null,
    secondsSurvived: null,
    tilesCount: null,
    time: null,
    timesUpPlayers: null,
    timesUpWinnerId: null,
    villages: null,
    waiting: true,
    wood: null,
  }
  componentDidMount = async () => {
    const gameElement = document.getElementById('game')
    const name = window.localStorage.getItem('name')

    await startGame(
      gameElement,
      {
        setActionQueue: this.getChangeHandler('actionQueue'),
        setCountdownSeconds: this.getChangeHandler('countdownSeconds'),
        setFinishSeconds: this.getChangeHandler('finishSeconds'),
        setHoveredStructure: this.getChangeHandler('hoveredStructure'),
        setHoveredTileInfo: this.getChangeHandler('hoveredTileInfo'),
        setMessages: this.getChangeHandler('messages'),
        setMinPlayers: this.getChangeHandler('minPlayers'),
        setNamePreview: this.getChangeHandler('namePreview'),
        setPlayer: this.getChangeHandler('player'),
        setPlayers: this.getChangeHandler('players'),
        setTilesCount: this.getChangeHandler('tilesCount'),
        setTime: this.getChangeHandler('time'),
        setVillages: this.getChangeHandler('villages'),
        setWood: this.getChangeHandler('wood'),
        showDefeatScreen: this.showDefeatScreen,
        showTimesUpScreen: this.showTimesUpScreen,
        winGame: () => {
          this.setState({ isWinner: true })
        },
        showConnectionError: () => {
          this.setState({ connectionError: true })
        },
        showGame: () => {
          this.setState({ waiting: false })
        },
      },
      name
    )

    window.addEventListener('resize', updateScreenSize)
  }
  componentWillUnmount = () => {
    stopGame()
    window.removeEventListener('resize', updateScreenSize)
  }
  getChangeHandler = name => value => {
    this.setState({ [name]: value })
  }
  showDefeatScreen = ({ killerName, secondsSurvived }) => {
    this.setState({ defeated: true, killerName, secondsSurvived })
  }
  showTimesUpScreen = ({ players, winnerId }) => {
    this.setState({
      timesUp: true,
      timesUpPlayers: players,
      timesUpWinnerId: winnerId,
    })
  }
  render() {
    if (
      this.state.connectionError &&
      !this.state.isWinner &&
      !this.state.timesUp
    ) {
      return <ErrorScreen />
    }

    return (
      <PageWrapper>
        <div id="game" />
        <Leaderboard leaders={this.state.players} />
        <YourEmpire
          player={this.state.player}
          tilesCount={this.state.tilesCount}
          villages={this.state.villages}
        />
        <Wood
          wood={this.state.wood}
          notEnoughWood={
            this.state.hoveredTileInfo
              ? this.state.hoveredTileInfo.notEnoughWood
              : false
          }
        />
        <HoverPreview hoveredTileInfo={this.state.hoveredTileInfo} />
        <NamePreview name={this.state.namePreview} />
        <Actions actions={this.state.actionQueue} />
        <Time time={this.state.time} />
        {this.state.defeated && (
          <DefeatScreen
            killerName={this.state.killerName}
            secondsSurvived={this.state.secondsSurvived}
          />
        )}
        {this.state.timesUp && (
          <TimesUpScreen
            players={this.state.timesUpPlayers}
            winnerId={this.state.timesUpWinnerId}
            playerId={this.state.player.id}
          />
        )}
        {this.state.waiting && this.state.players.length > 0 && (
          <WaitingScreen
            players={this.state.players}
            player={this.state.player}
            minPlayers={this.state.minPlayers}
            countdownSeconds={this.state.countdownSeconds}
            messages={this.state.messages}
            sendMessage={sendMessage}
            onPatternSelect={selectPattern}
          />
        )}
        {this.state.isWinner && <WinScreen />}
      </PageWrapper>
    )
  }
}

export default Game
