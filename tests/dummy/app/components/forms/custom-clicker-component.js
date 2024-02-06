// BEGIN-SNIPPET custom-clicker-component.js
// forms/custom-clicker-component
import Component from '@glimmer/component';

export default class CustomClickerComponent extends Component {
  get icon() {
    return this.args.formField.customProps.showAdvanced
      ? 'svg/icons/icon-arrow-up'
      : 'svg/icons/icon-arrow-down';
  }
}
// END-SNIPPET
