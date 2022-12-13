const { keys } = Object;

export default function castAllowedFields(changesetWebform) {
  
  var allKeys = (changesetWebform.changeset.changes || []).map(item => {
    return item.key;
  }).concat(keys(changesetWebform.changeset.data));

  var allowedKeys = allKeys.filter(key => {
    var relatedField = changesetWebform.fields.find(field => {
      return field.propertyName === key;
    }) || {};
    return !(relatedField.hidden || relatedField.castOut);
  });
  return changesetWebform.changeset.cast(allowedKeys);
}
