import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Checkbox extends Component {
  @action
  checkboxToggled(formField, value, event) {
    this.args.updateFieldValue(value);
    this.args.onUserInteraction('checkboxToggled', value, event);
  }
}
