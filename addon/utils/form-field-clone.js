import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import { tracked } from '@glimmer/tracking';
export default class FormFieldClone {
  @tracked index;
  @tracked eventLog = [];
  @tracked focussed;
  @tracked changeset;
  @tracked validationEvents = [];
  // BEGIN-SNIPPET cloned-field-settings-tracked-props.js
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
    return (
      this.changeset.get(`error.${this.masterFormField.fieldId}.validation`) ||
      []
    );
  }

  get cloneValidationErrors() {
    var index = this.index;
    const changeset = this.changeset;
    var validationErrors =
      changeset.get(`error.${this.masterFormField.fieldId}.validation`) || [];
    const cloneValidationErrors = validationErrors.find((item) => {
      return typeof item === 'object' || item.clones;
    });
    if (!cloneValidationErrors) {
      return null;
    }
    return cloneValidationErrors.clones[index];
  }

  get validationStatus() {
    var clonedFormField = this;
    if (!clonedFormField) {
      return;
    }
    if (
      !this.validationEventObj(clonedFormField.validationEvents, 'keyUp') &&
      clonedFormField.focussed
    ) {
      return;
    }
    if (!validationEventLog(clonedFormField).length) {
      return;
    }
    var clonedFieldValidationErrors = this.cloneValidationErrors || [];
    if (clonedFieldValidationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  validationEventObj(validationEvents, eventType) {
    return validationEvents.find((validationEvent) => {
      return validationEvent.event === eventType;
    });
  }

  updateValidationActivation(index, eventType) {
    const clonedFormField = this;
    if (this.validationEventObj(clonedFormField.validationEvents, eventType)) {
      const validationRules = clonedFormField.validationRules[0];
      validationRules.activateValidation =
        validationRules.activateValidation || [];
      validationRules.activateValidation.push(index); // clonedFormField.set()
    }
  }
}
