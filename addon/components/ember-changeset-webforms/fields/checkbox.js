import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Checkbox extends Component {
  @action
  checkboxToggled(formField, value, event) {
    this.onChange(formField, value);
    this.onUserInteraction(formField, 'checkboxToggled', value, event);
  }
}
