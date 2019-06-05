import GameServerMessage from '../../types/GameServerMessage'

const players: GameServerMessage = {
  isArray: true,
  instance: true,
  autoDestroy: true,
  type: {
    id: 'string',
    name: 'string',
    pattern: 'string',
    allyId: 'string',
    tilesCount: 'number',
    gold: 'number',
    villages: 'number',
    alive: 'bool',
    registered: 'bool',
  },
}

export default players
