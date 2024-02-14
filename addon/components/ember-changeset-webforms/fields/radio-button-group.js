import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class RadioButtonGroup extends Component {
  @tracked fieldValue; // TODO see if this does anything

  get groupValue() {
    return this.fieldValue;
  }

  @action
  onRadioChange(value) {
    this.args.onUserInteraction('radioOptionChanged', value);
    this.args.updateFieldValue(value);
  }
}
