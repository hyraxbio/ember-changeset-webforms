import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Input extends Component {
  @action
  onChangeAction(formField, event) {
    this.args.onChange(formField, event.target.value);
  }

  @action
  onUserInteractionAction(formField, eventType, event) {
    this.args.onUserInteraction(
      formField,
      eventType,
      event.target.value,
      event
    );
    if (eventType === 'keyUp') {
      this.args.onChange(formField, event.target.value);
    }
  }
}
