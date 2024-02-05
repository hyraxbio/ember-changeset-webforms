import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
// BEGIN-SNIPPET custom-clicker-component.js
import Component from '@ember/component';
import layout from '../../templates/components/forms/custom-clicker-component';

@templateLayout(layout)
@tagName('')
export default class CustomClickerComponent extends Component {
  @computed('formField.showAdvanced')
  get icon() {
    return this.formField.showAdvanced
      ? 'svg/icons/icon-arrow-up'
      : 'svg/icons/icon-arrow-down';
  }
}
// END-SNIPPET
