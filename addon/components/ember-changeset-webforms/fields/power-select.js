import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/power-select';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  allowClear: computed('formField.allowClear', function() {
    if (this.get('formField.allowClear') === false) {
      return false;
    } else {
      return true;
    }
  }),
});