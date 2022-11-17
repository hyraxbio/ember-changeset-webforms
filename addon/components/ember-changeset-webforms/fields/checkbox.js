import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/checkbox';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    checkboxToggled: function(formField, value, event) {
      this.onChange(formField, value);
      this.onUserInteraction(formField, 'checkboxToggled', value, event);
    },
  }
});