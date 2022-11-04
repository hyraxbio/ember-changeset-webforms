import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/cloned-field-elements/validating-clone';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['ember-changeset-webforms-field-clone'],
  'data-test-class': 'ember-changeset-webforms-clone-wrapper',

  didInsertElement: function() {
    var changesetProp = this.get('changesetProp');
    if (changesetProp.get(this.masterFormField.propertyName)[this.index]) {
      this.clonedFormField.eventLog.pushObject('insert');
      this.masterFormField.eventLog.pushObject('insertClone');
      this.updateValidationActivation(this.clonedFormField, this.index, 'insert');

      this.validateProperty(changesetProp, this.masterFormField);
    }
  },
  
  cloneValidationErrors: computed('changesetProp.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.fieldId')}.validation`)) || []);
    const cloneValidationErrors = [...validationErrors].find(item => {
      return typeof item === 'object' || item.clones;
    });
    if (!cloneValidationErrors) { return; }
    return cloneValidationErrors.clones[index];
  }),

  displayValidation: computed('cloneValidationErrors', 'changesetProp.error', 'clonedFormField.{focussed,fieldErrors,fieldErrors.@each,eventLog.[]}', function() {
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    if (!this.validationEventObj(clonedFormField.validationEvents, 'keyUp') && clonedFormField.get('focussed')) {
      return;
    }   
    if (!validationEventLog(clonedFormField).length) { return; }
    var clonedFieldValidationErrors = this.get('cloneValidationErrors') || [];
    if (clonedFieldValidationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  updateValidationActivation(clonedFormField, index, eventType) {
    if (this.validationEventObj(clonedFormField.validationEvents, eventType)) {
      const validationRules =  clonedFormField.validationRules[0];
      validationRules.activateValidation = validationRules.activateValidation || [];
      validationRules.activateValidation.push(index);// clonedFormField.set()
    }
  },

  actions: {
    onFocusOutClone(index, clonedFormField, value) {
      clonedFormField.eventLog.push('focusOut');
      this.masterFormField.eventLog.push('focusOutClone');
      clonedFormField.set('focussed', false);
      this.updateValidationActivation(clonedFormField, index, 'focusOut');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },

    onFocusInClone(index, clonedFormField) {
      clonedFormField.set('focussed', true);
      clonedFormField.eventLog.push('focusIn');
      this.masterFormField.eventLog.push('focusInClone');
      this.updateValidationActivation(clonedFormField, index, 'focusIn');
    },

    onKeyUpClone(index, clonedFormField, value, event) {
      clonedFormField.eventLog.push('keyUp');
      this.masterFormField.eventLog.push('keyUpClone');
      this.updateValidationActivation(clonedFormField, index, 'keyUp');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },

    onChangeClone(index, clonedFormField, value, eventType = 'change') {
      clonedFormField.eventLog.push(eventType);
      this.masterFormField.eventLog.push(`${eventType}Clone`);
      this.updateValidationActivation(clonedFormField, index, eventType)

      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },
  },

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  },


});