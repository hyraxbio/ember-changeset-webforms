import dotify from 'ember-pojo-validating-fields/utils/dotify';

export default function castAllowedFields(formFields, changeset) {
  var fromChanges = (changeset.changes || []).map(item => {
    return item.key;
  });
  
  var fromData = [];
  for (var key in dotify(changeset.data)) {
    fromData.push(key);
  }
  var allKeys =  fromChanges.concat(fromData).uniq();
  var allowedKeys = allKeys.filter(key => {
    var relatedField = formFields.find(field => {
      return field.propertyName === key;
    }) || {};
    return !(relatedField.hidden || relatedField.castOut);
  });
  return changeset.cast(allowedKeys);
}
