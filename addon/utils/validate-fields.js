export default function validateAllowedFields(formFields, changeset) {
  var allowedFields = formFields.filter(field => {
    return !field.hidden && !field.skipValidation && field.validates;
  }).map(allowedField => {
    allowedField.set('showFieldValidation', true);
    if (allowedField.clonedFields) { // TODO does this really belong in a util.
      allowedField.clonedFields.forEach(clonedField => {
        clonedField.set('showFieldValidation', true);
      });
    }
    return allowedField.propertyName;
  });
  var validatePromises = allowedFields.map(allowedField => {
    return changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}
