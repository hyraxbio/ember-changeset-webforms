import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-radio-button';
import { computed } from '@ember/object';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default Component.extend({
  layout,
  tagName: '',

  radioId: computed('formField', 'option.value', function() {
    if (this.formField.fieldId === this.option.value) {
      return safeName(this.formField.id);
    }
    return safeName(`${this.formField.id}-${this.option.value}`)
  }),
});