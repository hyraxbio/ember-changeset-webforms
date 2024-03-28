import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Input extends Component {
  @action
  onChange(event) {
    this.args.updateFieldValue(event.target.value);
  }

  @action
  onUserInteraction(eventName, event) {
    const formField = this.args.formField;
    let value = event.target.value;
    this.args.onUserInteraction(eventName, value, event);
    if (eventName === 'keyUp') {
      if (formField.fieldType === 'input' && event.keyCode === 13) {
        if (this.args.submitForm) {
          formField.focussed = false;
          this.args.submitForm(this.args.changesetWebform.changeset); // TODO automated test that this works
        }
        return;
      }
      this.args.updateFieldValue(value);
    } else if (eventName === 'focusOut') {
      formField.focussed = false;
      if (
        value &&
        formField.trim &&
        formField.inputType !== 'password' &&
        typeof value === 'string'
      ) {
        value = value.trim();
      }
    } else if (eventName === 'focusIn') {
      formField.focussed = true;
    }
    if (this.args.formField.validationErrors) {
      this.element.setCustomValidity(
        this.args.formField.validationErrors.join(','),
      );
    } else {
      this.element.setCustomValidity('');
    }
  }

  @action
  didInsert(element) {
    this.element = element;
  }
}
