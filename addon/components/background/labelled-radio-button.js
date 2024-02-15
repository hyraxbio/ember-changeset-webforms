import Component from '@glimmer/component';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default class LabelledRadioButton extends Component {
  get radioId() {
    if (this.args.formField.fieldId === this.args.option.value) {
      return safeName(this.args.formField.id);
    }
    return safeName(
      `${this.args.formField.id}-radio-option-${this.args.option.value}`,
    );
  }
}
