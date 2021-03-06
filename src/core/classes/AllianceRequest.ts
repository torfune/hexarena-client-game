import Player from './Player'
import Primitive from '../../types/Primitive'
import Prop from '../../types/Prop'
import createProp from '../../utils/createProp'
import { observable, computed, makeObservable } from 'mobx'

interface Props {
  [key: string]: Prop<Primitive>
  timeout: Prop<number>
}

class AllianceRequest {
  props: Props = {
    timeout: createProp(0),
  }

  readonly id: string
  readonly sender: Player
  readonly receiver: Player

  constructor(id: string, sender: Player, receiver: Player) {
    this.id = id
    this.sender = sender
    this.receiver = receiver

    makeObservable(this, {
      props: observable,
      timeout: computed,
    })
  }

  setProp(key: keyof Props, value: Primitive) {
    if (this.props[key].current === value) return

    this.props[key].previous = this.props[key].current
    this.props[key].current = value
  }

  get timeout() {
    return this.props.timeout.current
  }
}

export default AllianceRequest
