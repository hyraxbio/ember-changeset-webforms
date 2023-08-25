import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';

export default class FormField extends EmberObject {
  @computed('changeset.error', 'focussed', 'eventLog', 'eventLog.[]', function () {
    var formField = this;
    if (!formField) {
      return;
    }
    if (!formField.validates) {
      return;
    }
    if (!validationEventObj(formField.validationEvents, 'keyUp') && formField.get('focussed')) {
      return;
    }
    if (!validationEventLog(formField).length) {
      return;
    }
    const changeset = this.changeset;
    var validationErrors = changeset.get(`error.${formField.propertyName}.validation`) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  })
  validationStatus;

  validate() {
    return new Promise((resolve, reject) => {
      const formField = this;
      const changeset = this.changeset;
      if (!formField.validates) {
        return;
      }
      if (!validationEventLog(formField).length) {
        return;
      }
      changeset
        .validate(formField.propertyName)
        .then(() => {
          formField.wasValidated = true;
          const fieldValidationErrors = changeset.error[formField.propertyName];
          resolve(fieldValidationErrors);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

function validationEventObj(validationEvents, eventType) {
  return validationEvents.find((validationEvent) => {
    return validationEvent.event === eventType;
  });
}
