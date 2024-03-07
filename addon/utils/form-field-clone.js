import { tracked } from '@glimmer/tracking';
export default class FormFieldClone {
  @tracked index;
  @tracked id;
  @tracked eventLog = [];
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  // BEGIN-SNIPPET cloned-field-settings-tracked-props.js
  @tracked hidden;
  @tracked disabled;
  @tracked externalProps;
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }

  get fieldValue() {
    var groupValue = this.masterFormField.fieldValue;
    var index = this.index;
    if (!groupValue) {
      return null;
    }
    return groupValue[index];
  }

  get eventLogValidated() {
    return this.validatesOn.filter((eventName) =>
      this.eventLog.includes(eventName),
    );
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
      return null;
    }

    if (
      !clonedFormField.showValidationWhenFocussed &&
      clonedFormField.focussed
    ) {
      return null;
    }

    if (!this.eventLogValidated.length) {
      return null;
    }
    var clonedFieldValidationErrors = this.cloneValidationErrors || [];
    if (clonedFieldValidationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  updateValidationActivation() {
    if (this.eventLogValidated.length && this.validationRules[0]) {
      const validationRules = this.validationRules[0];
      validationRules.activateValidation =
        validationRules.activateValidation || [];
      validationRules.activateValidation.push(this.index);
    }
  }
}
