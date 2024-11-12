import { tracked } from '@glimmer/tracking';
export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields;
  @tracked eventLog = [];
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  // @tracked wasValidated;
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

  get fieldValue() {
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

  get wasValidated() {
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
    return true;
  }

  get validationStatus() {
    if (!this.wasValidated) {
      return null;
    }
    if (this.validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  get dynamicallyExcluded() {
    if (!this.dynamicIncludeExclude) {
      return null;
    }
    let result =
      this.dynamicIncludeExclude.default === 'exclude' ? true : false;
    if (
      this.overrideConditionsFulfilled(
        this.dynamicIncludeExclude.toggleDefault,
        this.changeset,
      )
    ) {
      result = !result;
    }
    return result;
  }

  checkCondition(changeset, condition) {
    const value = changeset.get(condition.fieldId); // Needs to use propertyName or better yet, fieldValue

    if (condition.valueEquals && (!value || value !== condition.valueEquals)) {
      return false;
    }
    if (
      condition.valueLengthEq &&
      (!value || value.length !== condition.valueLengthEq)
    ) {
      return false;
    }
    if (
      condition.valueLengthLt &&
      (!value || !(value.length < condition.valueLengthLt))
    ) {
      return false;
    }
    if (
      condition.valueLengthLte &&
      (!value || !(value.length <= condition.valueLengthLte))
    ) {
      return false;
    }
    if (
      condition.valueLengthGt &&
      (!value || !(value.length > condition.valueLengthGt))
    ) {
      return false;
    }
    if (
      condition.valueLengthGte &&
      (!value || !(value.length >= condition.valueLengthGte))
    ) {
      return false;
    }

    if (
      condition.valueIncludes &&
      (!value || !value.includes(condition.valueIncludes))
    ) {
      return false;
    }
    if (
      condition.valueExcludes &&
      (!value || value.includes(condition.valueExcludes)) // Should valueExcludes be true if value is null or undefined?
    ) {
      return false;
    }
    return true;
  }

  checkConditions(ruleSet, changeset) {
    const results = ruleSet.conditions.map((condition) => {
      if (condition.conditions) {
        return this.checkConditions(condition, changeset);
      }
      return this.checkCondition(changeset, condition);
    });
    if (ruleSet.ruleType === 'allConditionsTrue') {
      return results.includes(false) ? false : true;
    } else if (ruleSet.ruleType === 'anyConditionsTrue') {
      return results.includes(true) ? true : false;
    }
  }

  overrideConditionsFulfilled(ruleSet, changeset) {
    const results = this.checkConditions(ruleSet, changeset);
    return results;
  }

  updateValue(value) {
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
      changeset
        .validate(formField.propertyName)
        .then(() => {
          // formField.wasValidated = true;
          const fieldValidationErrors = changeset.error[formField.propertyName];
          resolve(fieldValidationErrors);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
