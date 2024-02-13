import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Checkbox extends Component {
  @action
  checkboxToggled(formField, value, event) {
    this.args.onChange(value);
    this.args.onUserInteraction('checkboxToggled', value, event);
  }
}
