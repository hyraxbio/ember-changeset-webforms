import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default EmberObject.extend({
  validationStatus: computed('changeset.error', 'focussed', 'eventLog', 'eventLog.[]', function () {
    var formField = this;
    if (!formField) { return; }
    if (!formField.validates) { return; }
    if (!validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    if (!validationEventLog(formField).length) { return }

    var validationErrors = (this.get(`changeset.error.${formField.propertyName}.validation`)) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  validate() {
    return new Promise((resolve, reject) => {
      const formField = this;
      const changeset = this.changeset;
      if (!formField.validates) { return; }
      if (!validationEventLog(formField).length) { return }
      changeset.validate(formField.propertyName).then(() => {
        formField.set('wasValidated', true);
        const fieldValidationErrors = changeset.error[formField.propertyName];
        resolve(fieldValidationErrors);
      }).catch(err => {
        reject(err);
      });
    });
  },
});

function validationEventObj(validationEvents, eventType) {
  return validationEvents.find(validationEvent => {
    return validationEvent.event === eventType;
  });
}
