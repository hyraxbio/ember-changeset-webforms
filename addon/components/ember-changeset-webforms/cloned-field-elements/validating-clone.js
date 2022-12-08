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
      this.updateValidationActivation(this.clonedFormField, this.clonedFormField.index, 'insert');

      this.validateProperty(changesetProp, this.masterFormField);
    }
  },
  // TODO move this into the Class
  updateValidationActivation(clonedFormField, index, eventType) {
    if (this.validationEventObj(clonedFormField.validationEvents, eventType)) {
      const validationRules =  clonedFormField.validationRules[0];
      validationRules.activateValidation = validationRules.activateValidation || [];
      validationRules.activateValidation.push(index);// clonedFormField.set()
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
      this.updateValidationActivation(clonedFormField, index, 'focusOut');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
      this.onUserInteractionClone(clonedFormField, `${eventType}Clone`, value, event);
    },

    onChangeClone(index, clonedFormField, value, eventType = 'change') {
      clonedFormField.eventLog.push(eventType);
      this.masterFormField.eventLog.push(`${eventType}Clone`);
      this.updateValidationActivation(clonedFormField, index, eventType);
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },
  },

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
});