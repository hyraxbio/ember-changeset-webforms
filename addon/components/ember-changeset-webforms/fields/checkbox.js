import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Checkbox extends Component {
  @action
  checkboxToggled(formField, value, event) {
    this.args.onChange(formField, value);
    this.args.onUserInteraction(formField, 'checkboxToggled', value, event);
  }
}
