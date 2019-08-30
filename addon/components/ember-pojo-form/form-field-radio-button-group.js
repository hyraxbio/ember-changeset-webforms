import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/ember-pojo-form/form-field-radio-button-group';

export default Component.extend({
  layout,
  classNames: ['radio-button-group'],

  groupValue: computed('displayValue', function() {
    return this.get('displayValue');
  }),
});
