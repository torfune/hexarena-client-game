// TILE
export const TILE_RADIUS = 73
export const TILE_IMAGES = [
  'background',
  'water',
  'pattern',
  'border',
  'army',
  'forest',
  'mountain',
  'capital',
  'castle',
  'village',
  'camp',
  'action',
  'fog',
]
export const NEIGHBOR_DIRECTIONS = [
  { x: 1, z: -1 },
  { x: 1, z: 0 },
  { x: 0, z: 1 },
  { x: -1, z: 1 },
  { x: -1, z: 0 },
  { x: 0, z: -1 },
]

// COLORS
export const FACEBOOK_PRIMARY = '#3b5998'
export const GOOGLE_PRIMARY = '#dd4b39'

// ZOOM
export const ZOOM_SPEED = 0.1
export const MAX_SCALE = 1
export const MIN_SCALE = 0.2
export const DEFAULT_SCALE = 0.5

// ACTION
export const ACTION_WIDTH = 180
export const ACTION_HEIGHT = 16
export const ACTION_BORDER_RADIUS = ACTION_HEIGHT / 2

// ARMIES
export const UNIT_COUNT = 8
export const UNIT_POSITION_OFFSET = 60
export const UNIT_MOVEMENT_SPEED = 0.02
export const UNIT_RADIUS = 16
export const UNIT_IMAGE_SCALE = 0.8
export const UNIT_DOOR_OFFSET = 48
export const UNIT_MAX_DELAY = 0.4

// ATTACK / DEFEND - (DONT CHANGE THIS WITHOUT CHANGING ON GAMESERVER TOO!)
export const DEFAULT_DEFEND_POWER = 11
export const DEFAULT_ATTACK_POWER = 1
export const POWER_PER_NEIGHBOR = 2
export const MOUNTAIN_POWER = 24
export const FOREST_POWER = 5
export const MS_PER_POWER = 150
