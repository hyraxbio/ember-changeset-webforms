import { action } from '@ember/object';
import Component from '@glimmer/component';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default class LabelledCheckbox extends Component {
  get checkboxId() {
    if (this.args.formField.fieldId === this.args.option.key) {
      return `${safeName(this.args.formField.id)}-checkbox`;
    }
    return safeName(
      `${this.args.formField.id}-checkbox-option-${this.args.option.key}`,
    );
  }

  @action
  checkboxClicked(event) {
    if (this.args.changedAction) {
      this.args.changedAction(event.target.checked, event);
    }
  }
}
