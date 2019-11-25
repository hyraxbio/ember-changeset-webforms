export default function castAllowedFields(formFields, changeset) {
  var allowedFields = formFields.filter(field => {
    return !(field.hidden || field.castOut);
  }).map(allowedField => {
    return allowedField.fieldId;
  });
  return changeset.cast(allowedFields);
}
