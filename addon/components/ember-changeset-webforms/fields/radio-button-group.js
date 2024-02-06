import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class RadioButtonGroup extends Component {
  @tracked displayValue;

  get groupValue() {
    return this.displayValue;
  }

  @action
  onRadioChange(value) {
    this.args.onUserInteraction(
      this.args.formField,
      'radioOptionChanged',
      value,
    );
    this.args.onChange(this.args.formField, value);
  }
}
