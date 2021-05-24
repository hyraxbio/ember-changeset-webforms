import dotify from 'ember-changeset-webforms/utils/dotify';

export default function castAllowedFields(changesetWebform) {
  const changeset = changesetWebform.changeset;
  var fromChanges = (changeset.changes || []).map(item => {
    return item.key;
  });
  var changesetDataPojo;
  if (changeset.data.toJSON) {
    changesetDataPojo = changeset.data.toJSON();
  } else {
    changesetDataPojo = changeset.data;
  }
  var fromData = [];
  for (var key in dotify(changesetDataPojo)) {
    fromData.push(key);
  }
  var allKeys =  fromChanges.concat(fromData).uniq();
  var allowedKeys = allKeys.filter(key => {
    var relatedField = changesetWebform.fields.find(field => {
      return field.propertyName === key;
    }) || {};
    return !(relatedField.hidden || relatedField.castOut);
  });
  return changeset.cast(allowedKeys);
}
