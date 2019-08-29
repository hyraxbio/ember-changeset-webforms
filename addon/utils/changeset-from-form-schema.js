import objectFromPath from './object-from-path';

export default function changesetFromFormSchema(formSchema) {
  var changeset = {};
  formSchema.fields.forEach(field => {
    changeset = objectFromPath(changeset, field.fieldId);
  });
  return changeset;
}