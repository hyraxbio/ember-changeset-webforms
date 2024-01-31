import defaultValidators from 'ember-changeset-validations/validators';
import clonedValidator from 'ember-changeset-webforms/validators/cloned';
import uniqueCloneValidator from 'ember-changeset-webforms/validators/unique-clone';
import { unflatten } from 'flat';

export default function createValidations(fields, customValidators = {}) {
  defaultValidators.validateClone = clonedValidator;
  defaultValidators.uniqueClone = uniqueCloneValidator;

  var validations = {};
  if (!fields) {
    return validations;
  }
  fields.forEach((field) => {
    field.propertyName = field.propertyName || field.fieldId;
    // field.cloneFieldSchema = field.cloneFieldSchema || {};
    // if (field.cloneFieldSchema.validationRules) {
    //   field.validationRules = field.validationRules || [];
    //   field.validationRules.push({
    //     validationMethod: 'validateClone',
    //     arguments: {
    //       validationRules: field.cloneFieldSchema.validationRules,
    //       customValidators: customValidators
    //     }
    //   });
    // }

    if (!field.validationRules) {
      return;
    }

    var fieldValidations = [];

    field.validationRules.forEach((rule) => {
      var validator =
        customValidators[rule.validationMethod] ||
        defaultValidators[rule.validationMethod];
      if (!validator) {
        return;
      }
      fieldValidations.push(validator(rule.arguments));
    });
    validations[field.propertyName] = fieldValidations;
  });
  return unflatten(validations);
}
