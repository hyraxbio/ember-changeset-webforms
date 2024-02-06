import { computed } from '@ember/object';
// BEGIN-SNIPPET custom-clicker-component.js
import Component from '@glimmer/component';

export default class CustomClickerComponent extends Component {
  @computed('formField.showAdvanced')
  get icon() {
    return this.formField.showAdvanced
      ? 'svg/icons/icon-arrow-up'
      : 'svg/icons/icon-arrow-down';
  }
}
// END-SNIPPET
