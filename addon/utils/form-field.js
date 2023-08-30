import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import { tracked } from '@glimmer/tracking';
export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields;
  @tracked eventLog = [];
  @tracked focussed;
  @tracked changeset;
  @tracked validationEvents = [];
  @tracked wasValidated;
  // BEGIN-SNIPPET field-settings-tracked-props.js
  @tracked hidden;
  @tracked disabled;
  @tracked externalProps = {};
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }

  get validationErrors() {
    return this.changeset.get(`error.${this.fieldId}.validation`) || [];
  }

  get masterFormFieldValidationErrors() {
    const masterFormFieldValidationErrors = this.validationErrors.filter(
      (item) => {
        return typeof item !== 'object' || !item.clones;
      }
    );
    return masterFormFieldValidationErrors;
  }

  get validationStatus() {
    if (!this.validates) {
      return null;
    }
    if (!validationEventObj(this.validationEvents, 'keyUp') && this.focussed) {
      return null;
    }
    if (!validationEventLog(this).length) {
      return null;
    }

    if (this.validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

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
