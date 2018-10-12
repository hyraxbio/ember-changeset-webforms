import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/svg/form-field-radio-button-group';

export default Component.extend({
  layout,
  classNames: ['radio-button-group'],

  groupValue: computed('formField.value', function() {
    return this.get('formField.value');
  }),
});
