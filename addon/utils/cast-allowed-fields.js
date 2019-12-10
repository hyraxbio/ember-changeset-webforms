export default function castAllowedFields(formFields, changeset) {
  var allowedFields = formFields.filter(field => {
    return !(field.hidden || field.castOut);
  }).map(allowedField => {
    return allowedField.propertyName;
  });
  return changeset.cast(allowedFields);
}
