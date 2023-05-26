import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import layout from '../../../templates/components/ember-changeset-webforms/fields/radio-button-group';

export default Component.extend({
  layout,
  tagName: '',

  groupValue: reads('displayValue'),

  actions: {
    onRadioChange(value) {
      this.onUserInteraction(this.formField, 'radioOptionChanged', value);
      this.onChange(this.formField, value);
    },
  },
});
