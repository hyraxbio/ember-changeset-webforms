import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default EmberObject.extend({
  cloneValidationErrors: computed('changeset.error', 'focussed', 'eventLog.[]', function() {
    var index = this.get('index');
    // console.log(index);
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || []);
    const cloneValidationErrors = [...validationErrors].find(item => {
      return typeof item === 'object' || item.clones;
    });
    if (!cloneValidationErrors) { return; }
    return cloneValidationErrors.clones[index];
  }),

  validationStatus: computed('cloneValidationErrors', 'changeset.error', 'clonedFormField.{focussed,fieldErrors,fieldErrors.@each,eventLog.[]}', function() {
    var clonedFormField = this;
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

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
})