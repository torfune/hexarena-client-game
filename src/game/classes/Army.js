import game from '../../game'
import Unit from './Unit'
import getPixelPosition from '../functions/getPixelPosition'
import getUniqueRandomizedPositions from '../functions/getUniqueRandomizedPositions'
import {
  UNIT_COUNT,
  UNIT_POSITION_OFFSET,
  UNIT_MOVEMENT_SPEED,
  UNIT_RADIUS,
  UNIT_DOOR_OFFSET,
} from '../../constants'

class Army {
  constructor({ id, tile, ownerId }) {
    this.id = id
    this.ownerId = ownerId
    this.tile = tile
    this.units = []
    this.animationFraction = null
    this.isMoving = false
    this.isDestroying = false
    this.lastScale = game.scale
    this.alpha = 1

    const position = getPixelPosition(tile.x, tile.z)
    const randomizedPositions = getUniqueRandomizedPositions(
      UNIT_COUNT,
      UNIT_RADIUS * game.scale,
      position,
      UNIT_POSITION_OFFSET * game.scale
    )

    const isInside = tile.capital || tile.castle || tile.camp

    for (let i = 0; i < UNIT_COUNT; i++) {
      if (isInside) {
        this.units.push(new Unit(position))
      } else {
        this.units.push(new Unit(randomizedPositions[i]))
      }
    }

    if (isInside) {
      tile.addArmy(this)
    }
  }
  update() {
    if (this.isDestroying) {
      this.alpha -= 0.02

      for (let i = 0; i < UNIT_COUNT; i++) {
        this.units[i].setAlpha(this.alpha)
      }

      if (this.alpha <= 0) {
        for (let i = 0; i < UNIT_COUNT; i++) {
          this.units[i].destroy()
        }

        const index = game.armies.indexOf(this)
        if (index !== -1) {
          game.armies.splice(index, 1)
        }

        return
      }
    }

    if (!this.isMoving) return

    this.animationFraction += UNIT_MOVEMENT_SPEED
    if (this.animationFraction > 1) {
      this.animationFraction = 1
    }

    for (let i = 0; i < UNIT_COUNT; i++) {
      this.units[i].update(this.animationFraction)
    }

    if (this.animationFraction === 1) {
      this.isMoving = false
      this.animationFraction = null
    }
  }
  updateScale() {
    for (let i = 0; i < UNIT_COUNT; i++) {
      this.units[i].updateScale(this.lastScale, game.scale)
    }

    this.lastScale = game.scale
  }
  moveOn(tile) {
    if (tile === this.tile) return

    if (this.tile.army === this) {
      this.tile.removeArmy()
    }

    this.tile = tile
    this.isMoving = true
    this.animationFraction = 0

    const sameOwner = tile.owner && tile.owner.id === this.ownerId
    const position = getPixelPosition(tile.x, tile.z)
    const doorPosition = {
      x: position.x,
      y: position.y + UNIT_DOOR_OFFSET * game.scale,
    }
    const randomizedPositions = getUniqueRandomizedPositions(
      UNIT_COUNT,
      UNIT_RADIUS * game.scale,
      position,
      UNIT_POSITION_OFFSET * game.scale
    )

    for (let i = 0; i < UNIT_COUNT; i++) {
      if (tile.capital || tile.castle) {
        this.units[i].moveOn(doorPosition)
      } else {
        this.units[i].moveOn(randomizedPositions[i])
      }
    }

    if (
      sameOwner &&
      !this.isDestroying &&
      (tile.capital || tile.castle || tile.camp)
    ) {
      tile.addArmy(this)
    }
  }
  destroy() {
    this.isDestroying = true

    if (this.tile.army && this.tile.army === this) {
      this.tile.removeArmy()
    }
  }
}

export default Army
