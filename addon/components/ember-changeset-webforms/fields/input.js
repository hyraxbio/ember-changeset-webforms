import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/input';

@templateLayout(layout)
@tagName('')
export default class Input extends Component {
  @action
  onChangeAction(formField, event) {
    this.onChange(formField, event.target.value);
  }

  @action
  onUserInteractionAction(formField, eventType, event) {
    this.onUserInteraction(formField, eventType, event.target.value, event);
    if (eventType === 'keyUp') {
      this.onChange(formField, event.target.value);
    }
  }
}
