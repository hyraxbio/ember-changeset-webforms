import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/input';

export default Component.extend({
  layout,

  actions: {
    onChange(formField, event) {
      this.onChange(formField, event.target.value);
    },

    onUserInteraction(formField, eventType, event) {
      this.onUserInteraction(formField, eventType, event.target.value, event)
    }
  }
});