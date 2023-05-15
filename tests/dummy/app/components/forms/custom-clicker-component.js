// BEGIN-SNIPPET custom-clicker-component.js
import Component from '@ember/component';
import layout from '../../templates/components/forms/custom-clicker-component';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  icon: computed('formField.showAdvanced', function() {
    return this.formField.showAdvanced ? 'svg/icons/icon-arrow-up' : 'svg/icons/icon-arrow-down'
  }),
});
// END-SNIPPET