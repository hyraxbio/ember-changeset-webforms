export default function validateAllowedFields(changesetWebform) {
  var allowedFields = changesetWebform.fields.filter(field => {
    return !field.hidden && !field.skipValidation && field.validates;
  }).map(allowedField => {
    allowedField.eventLog.pushObject('submit');
    if (allowedField.clonedFields) { // TODO does this really belong in a util.
      allowedField.clonedFields.forEach(clonedField => {
        clonedField.eventLog.pushObject('submit');

      });
    }
    return allowedField.propertyName;
  });
  var validatePromises = allowedFields.map(allowedField => {
    return changesetWebform.changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}
