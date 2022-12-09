import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone';

export default Component.extend({
  layout,
  classNames: ['ember-changeset-webforms-field-clone'],
  'data-test-class': 'ember-changeset-webforms-clone-wrapper',

  didInsertElement: function() {
    var changesetProp = this.get('changesetProp');
    if (changesetProp.get(this.masterFormField.propertyName)[this.clonedFormField.index]) {
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
      clonedFormField.eventLog.push(eventType);
      this.masterFormField.eventLog.push('focusOutClone');
      clonedFormField.updateValidationActivation(index, 'focusOut');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
      this.onUserInteractionClone(clonedFormField, `${eventType}Clone`, value, event);
    },

    onChangeClone(index, clonedFormField, value, eventType = 'change') {
      clonedFormField.eventLog.push(eventType);
      this.masterFormField.eventLog.push(`${eventType}Clone`);
      clonedFormField.updateValidationActivation(index, eventType);
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },
  }
});