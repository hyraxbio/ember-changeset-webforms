import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class RadioButtonGroup extends Component {
  @tracked displayValue; // TODO see if this does anything

  get groupValue() {
    return this.displayValue;
  }

  @action
  onRadioChange(value) {
    this.args.onUserInteraction('radioOptionChanged', value);
    this.args.updateFieldValue(value);
  }
}
