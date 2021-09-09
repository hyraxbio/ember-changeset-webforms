const { keys } = Object;

export default function castAllowedFields(formFields, changeset) {
  
  var allKeys = (changeset.changes || []).map(item => {
    return item.key;
  }).concat(keys(changeset.data));

  var allowedKeys = allKeys.filter(key => {
    var relatedField = formFields.find(field => {
      return field.propertyName === key;
    }) || {};
    return !(relatedField.hidden || relatedField.castOut);
  });
  return changeset.cast(allowedKeys);
}
