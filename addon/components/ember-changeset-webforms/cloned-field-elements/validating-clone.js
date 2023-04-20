import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone';

export default Component.extend({
  layout,
  classNames: ['cwf-field-clone-wrapper'],
  attributeBindings: ['dataTestClass:data-test-class'],
  dataTestClass: 'cwf-field-clone-wrapper',

  didInsertElement: function() {
this._super(...arguments);
    var changeset = this.changesetWebform.changeset;
    if (changeset.get(this.masterFormField.propertyName)[this.clonedFormField.index]) {
      this.clonedFormField.eventLog.pushObject('insert');
      this.masterFormField.eventLog.pushObject('insertClone');
      this.clonedFormField.updateValidationActivation(this.clonedFormField.index, 'insert');

      this.validateField(this.masterFormField);
    }
  },

  actions: {
    onUserInteractionClone(index, clonedFormField, eventType, value, event) {
      if (eventType === 'focusOut') {
        clonedFormField.set('focussed', false);
      } else if (eventType === 'focusIn') {
        clonedFormField.set('focussed', true);
      }
      clonedFormField.eventLog.pushObject(eventType);
      this.masterFormField.eventLog.pushObject(`${eventType}Clone`);
      clonedFormField.updateValidationActivation(index, eventType);
      this.onUserInteraction(clonedFormField, `${eventType}Clone`, value, event);
    },

    onChangeClone(index, clonedFormField, value, eventType = 'change') {
      clonedFormField.eventLog.pushObject(eventType);
      this.masterFormField.eventLog.pushObject(`${eventType}Clone`);
      clonedFormField.updateValidationActivation(index, eventType);
      this.setFieldValue(this.updatedGroupValue(value, index), this.masterFormField);
    },
  }
});