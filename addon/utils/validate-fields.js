export default function validateAllowedFields(formFields, changeset) {
  var allowedFields = formFields.filter(field => {
    return !field.hidden && !field.skipValidation;
  }).map(allowedField => {
    if (allowedField.clonedFields) { // TODO does this really belong in a util.
      allowedField.clonedFields.forEach(clonedField => {
        clonedField.set('wasValidated', true);
      });
    }
    return allowedField.propertyName;
  });
  var validatePromises = allowedFields.map(allowedField => {
    return changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}
