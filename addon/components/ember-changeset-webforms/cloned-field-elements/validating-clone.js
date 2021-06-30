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
      this.validateProperty(changesetProp, this.masterFormField);
    }
  },
  
  cloneErrors: computed('changesetProp.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    if (!validationErrors) { return; }
    return validationErrors[index];
  }),

  displayValidation: computed('changesetProp.error', 'clonedFormField.{focussed,fieldErrors,fieldErrors.@each,eventLog.[]}', function() {
    var index = this.get('index');
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    if (!this.validationEventObj(clonedFormField.validationEvents, 'keyUp') && clonedFormField.get('focussed')) {
      return;
    }   
    if (!validationEventLog(clonedFormField).length) { return; }

    var masterFieldvalidationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.fieldId')}.validation`)) || []);
    var clonedFieldValidationErrors = masterFieldvalidationErrors[0];
    if ((clonedFormField.fieldErrors || []).length > 0) {
      return 'invalid';
    }
    if (!masterFieldvalidationErrors) { return; }

    if (masterFieldvalidationErrors.length === 0) { return 'valid'; }

    if (!clonedFieldValidationErrors[index]) { return; }

    if (clonedFieldValidationErrors[index].length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  actions: {
    onFocusOutClone(index, clonedFormField, value) {
      clonedFormField.eventLog.push('focusOut');
      this.masterFormField.eventLog.push('focusOutClone');
      clonedFormField.set('focussed', false)
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },

    onFocusInClone(index, clonedFormField) {
      clonedFormField.set('focussed', true);
      clonedFormField.eventLog.push('focusIn');
      this.masterFormField.eventLog.push('focusInClone');
    },

    onKeyUpClone(index, clonedFormField, value, event) {
      clonedFormField.eventLog.push('keyUp');
      this.masterFormField.eventLog.push('keyUpClone');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },

    onChangeClone(index, clonedFormField, value) {
      clonedFormField.eventLog.push('change');
      this.masterFormField.eventLog.push('changeClone');
      this.setFieldValue(this.updatedGroupValue(value, index), this.get('masterFormField'));
    },
  },

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  },


});