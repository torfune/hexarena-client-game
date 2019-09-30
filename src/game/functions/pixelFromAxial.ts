import { TILE_RADIUS } from '../../constants/game'
import { Axial, Pixel } from '../../types/coordinates'

const pixelFromAxial = ({ x, z }: Axial): Pixel => ({
  x: TILE_RADIUS * 2 * (Math.sqrt(3) * x + (Math.sqrt(3) / 2) * z),
  y: TILE_RADIUS * 2 * ((3 / 2) * z),
})

export default pixelFromAxial
