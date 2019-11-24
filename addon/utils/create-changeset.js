import objectFromPath from './object-from-path';

export default function createChangesetData(fields) {
  var changeset = {};
  if (!fields) { return changeset; }
  fields.forEach(field => {
    if (field.defaultValue && !field.notrim && typeof field.defaultValue === 'string' && field.inputType !== 'password') {
      field.defaultValue = field.defaultValue.trim();
    }
    changeset = objectFromPath(changeset, field.fieldId, field.defaultValue);
  });
  return changeset;
}