import { Loader } from 'pixi.js-legacy'
import { version } from '../../../package.json'

const loader = Loader.shared
const images = '/static/images'

const loadImages = () => {
  return new Promise((resolve) => {
    loader
      .add('action-bg', `${images}/action-bg.png?${version}`)
      .add('action-icon-attack', `${images}/action-icon-attack.png?${version}`)
      .add('action-icon-heal', `${images}/action-icon-heal.png?${version}`)
      .add(
        'action-icon-recruit',
        `${images}/action-icon-recruit.png?${version}`
      )
      .add('action-icon-camp', `${images}/action-icon-camp.png?${version}`)
      .add('action-icon-tower', `${images}/action-icon-tower.png?${version}`)
      .add('action-icon-castle', `${images}/action-icon-castle.png?${version}`)
      .add('action-icon-house', `${images}/action-icon-house.png?${version}`)
      .add('army', `${images}/army.png?${version}`)
      .add('armyIcon', `${images}/army-icon.png?${version}`)
      .add('arrow', `${images}/arrow.png?${version}`)
      .add('capital', `${images}/capital.png?${version}`)
      .add('blackOverlay', `${images}/black-overlay.png?${version}`)
      .add('border', `${images}/border.png?${version}`)
      .add('castle', `${images}/castle.png?${version}`)
      .add('castle-icon', `${images}/castle-icon.png?${version}`)
      .add('fog', `${images}/fog.png?${version}`)
      .add('tree', `${images}/tree.png?${version}`)
      .add('gold', `${images}/gold.png?${version}`)
      .add('mountain01', `${images}/mountain01.png?${version}`)
      .add('mountain02', `${images}/mountain02.png?${version}`)
      .add('mountain03', `${images}/mountain03.png?${version}`)
      .add('mountain04', `${images}/mountain04.png?${version}`)
      .add('mountain05', `${images}/mountain05.png?${version}`)
      .add('camp', `${images}/camp.png?${version}`)
      .add('pattern', `${images}/pattern.png?${version}`)
      .add('tower', `${images}/tower.png?${version}`)
      .add('tower-icon', `${images}/tower-icon.png?${version}`)
      .add('house', `${images}/house.png?${version}`)
      .add('hpBackground2', `${images}/hpBackground2.png?${version}`)
      .add('hpBackground3', `${images}/hpBackground3.png?${version}`)
      .add('hpFill', `${images}/hpFill.png?${version}`)
      .add(
        'army-drag-arrow-head',
        `${images}/army-drag-arrow-head.png?${version}`
      )
      .add(
        'army-drag-arrow-body',
        `${images}/army-drag-arrow-body.png?${version}`
      )
      .load(resolve)
  })
}

export default loadImages
