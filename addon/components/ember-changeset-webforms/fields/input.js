import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Input extends Component {
  @action
  onChangeAction(event) {
    this.args.onChange(event.target.value);
  }

  @action
  onUserInteractionAction(eventType, event) {
    this.args.onUserInteraction(eventType, event.target.value, event);
    if (eventType === 'keyUp') {
      this.args.onChange(event.target.value);
    }
  }
}
