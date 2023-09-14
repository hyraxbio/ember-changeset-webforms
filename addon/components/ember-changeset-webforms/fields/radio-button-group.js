import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class RadioButtonGroup extends Component {
  @tracked displayValue;
  groupValue;
  get groupValue() {
    return this.displayValue;
  }

  @action
  onRadioChange(value) {
    this.onUserInteraction(this.formField, 'radioOptionChanged', value);
    this.onChange(this.formField, value);
  }
}
