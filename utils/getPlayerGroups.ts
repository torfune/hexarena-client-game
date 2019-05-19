import sortByKey from './sortByKey'
import Player from '../game/classes/Player'
import PlayerGroup from '../types/PlayerGroup'

const getPlayerGroups = (players: Player[]) => {
  let groups: PlayerGroup[] = []

  // Put players to groups
  for (const player of players) {
    let groupFound = false

    for (const group of groups) {
      if (group.players[0].allyId === player.id) {
        group.players.push(player)
        group.score += player.tilesCount
        groupFound = true
      }
    }

    if (!groupFound) {
      groups.push({
        players: [player],
        score: player.tilesCount,
      })
    }
  }

  // Sort groups
  groups = sortByKey(groups, 'score')

  // Sort players inside groups
  for (const group of groups) {
    group.players = sortByKey(group.players, 'tilesCount')
  }

  return groups
}

export default getPlayerGroups
