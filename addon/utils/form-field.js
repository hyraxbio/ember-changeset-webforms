import { tracked } from '@glimmer/tracking';
export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields;
  @tracked eventLog = [];
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  @tracked wasValidated;
  // BEGIN-SNIPPET field-settings-tracked-props.js
  @tracked hidden;
  @tracked disabled;
  @tracked hideValidation;
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }

  get displayValue() {
    return this.changeset.get(this.fieldId);
  }

  get validationErrors() {
    return this.changeset.get(`error.${this.fieldId}.validation`) || [];
  }

  get masterFormFieldValidationErrors() {
    const masterFormFieldValidationErrors = this.validationErrors.filter(
      (item) => {
        return typeof item !== 'object' || !item.clones;
      },
    );
    return masterFormFieldValidationErrors;
  }

  get eventLogValidated() {
    return this.validatesOn.filter((eventName) =>
      this.eventLog.includes(eventName),
    );
  }

  get validationStatus() {
    if (!this.validates) {
      return null;
    }

    if (this.hideValidation) {
      return null;
    }

    if (!this.showValidationWhenFocussed && this.focussed) {
      return null;
    }

    if (!this.eventLogValidated.length) {
      return null;
    }
    if (this.validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  updateValue(value) {
    console.log();
    this.eventLog.pushObject('valueUpdated');
    var changeset = this.changeset;
    this.previousValue = changeset.get(this.propertyName);
    changeset.set(this.propertyName, value);
    this.validate();
  }

  validate() {
    return new Promise((resolve, reject) => {
      const formField = this;
      const changeset = this.changeset;
      if (!formField.validates) {
        return;
      }
      if (!this.eventLogValidated.length) {
        return;
      }
      console.log('validate');
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
