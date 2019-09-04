import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-date-range';
export default Component.extend({
  layout,

  actions: {
    onUserInteraction(value) {
      var formField = this.get('formField');
      formField.set('value', value);
    },

    onOpen() {
      var formField = this.get('formField');
      formField.set('active', true);
    },

    onClose() {
      var formField = this.get('formField');
      formField.set('active', false);
    }
  }
});
