import parseChangesetWebformField from './parse-changeset-webform-field';

export default function parseChangesetWebformFields(formSchema, fieldComponentsMap) {
  return (formSchema.fields || []).map(field => {
    return parseChangesetWebformField(field, fieldComponentsMap, formSchema);
  });
}