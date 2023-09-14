import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class Clicker extends Component {
  @action
  onClick(formField, event) {
    this.onUserInteraction(formField, 'click', null, event);
  }
}
