// BEGIN-SNIPPET custom-clicker-component.js
import Component from '@glimmer/component';

export default class CustomClickerComponent extends Component {
  get icon() {
    return this.args.formField.externalProps.showAdvanced
      ? 'svg/icons/icon-arrow-up'
      : 'svg/icons/icon-arrow-down';
  }
}
// END-SNIPPET
