export default function validateAllowedFields(formFields, changeset) {
  var allowedFields = formFields.filter(field => {
    return !field.hidden && !field.skipValidation;
  }).map(allowedField => {
    return allowedField.fieldId;
  });
  var validatePromises = allowedFields.map(allowedField => {
    return changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}
