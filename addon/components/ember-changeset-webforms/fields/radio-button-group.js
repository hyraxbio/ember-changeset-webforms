import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RadioButtonGroup extends Component {
  @action
  onRadioChange(value) {
    this.args.onUserInteraction('radioOptionChanged', value);
    this.args.updateFieldValue(value);
  }
}
