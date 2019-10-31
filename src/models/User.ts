interface Auth {
  type: 'google' | 'facebook'
  id: string
}

interface User {
  _id: string
  name: string | null
  elo: number
  diamonds: number
  moderator: boolean
  mute: {
    mutedAt: number
    mutedBy: string
    messages: string[]
  } | null
  auth: Auth
  createdAt: number
  gamesWon: number
  gamesLost: number
}

export default User
