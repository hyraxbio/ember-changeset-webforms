import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/form-field-date-pikaday';

export default Component.extend({
  layout,
  dateFormat: computed('formField.format', function() {
    if (!this.get('format')) {
      return  "DD-MM-YYYY";
    } else {
      return this.get('formField.format');
    }
  }),
});