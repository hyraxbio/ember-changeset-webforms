import defaultValidators from 'ember-changeset-validations/validators';

export default function createValidations(fields, customValidators = {}) {
  var validations = {};
  if (!fields) { return validations; }
  fields.forEach(field => {
    if (!field.validationRules) { return; }
    var fieldValidations = [];
    field.validationRules.forEach(rule => {
      var validator = customValidators[rule.validationMethod] || defaultValidators[rule.validationMethod];
      
      if (!validator) { 
        return;
      }
      fieldValidations.push(validator(rule.arguments));
    });
    validations[field.fieldId] = fieldValidations;
  });
  return validations;
}
