import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Input extends Component {
  @action
  onChange(event) {
    this.args.updateFieldValue(event.target.value);
  }

  @action
  onUserInteraction(eventType, event) {
    const formField = this.args.formField;
    let value = event.target.value;
    this.args.onUserInteraction(eventType, value, event);
    if (eventType === 'keyUp') {
      if (formField.fieldType === 'input' && event.keyCode === 13) {
        if (this.args.submitForm) {
          formField.focussed = false;
          this.args.submitForm(this.args.changesetWebform.changeset); // TODO test that this works
        }
        return;
      }
      this.args.updateFieldValue(value);
    } else if (eventType === 'focusOut') {
      formField.focussed = false;
      if (
        value &&
        formField.trim &&
        formField.inputType !== 'password' &&
        typeof value === 'string'
      ) {
        value = value.trim();
      }
    } else if (eventType === 'focusIn') {
      formField.focussed = true;
    }
  }
}
