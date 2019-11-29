import defaultValidators from 'ember-changeset-validations/validators';

export default function createValidations(fields, customValidators = {}) {
  var validations = {};
  if (!fields) { return validations; }
  var clonedFields = [];
  var clonableFields = fields.filter(field => {
    return field.clonable;
  });
  clonableFields.forEach(clonableField => {
    clonableField.maxClones = clonableField.maxClones || 100; // TODO global max setting in the service.
    var array = [];
    for (var i = 0; i <= clonableField.maxClones; i++) {
      array.push(i);
    }
    clonedFields = clonedFields.concat(array.map(item => {
      return {
        fieldId: `${clonableField.fieldId}-${item + 1}`,
        validationRules: clonableField.validationRules
      };
    }));
  });
  fields.concat(clonedFields).forEach(field => {
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
