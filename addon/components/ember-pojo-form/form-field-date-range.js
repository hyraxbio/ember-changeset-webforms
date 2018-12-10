import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-date-range';

export default Component.extend({
  layout,

  actions: {
    onOpen() {
      this.setFieldProperty('active', true);
    },
    onClose() {
      this.setFieldProperty('active', false);
      this.validateField();
    }
  }
});
