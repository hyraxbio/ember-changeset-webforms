import parseChangesetWebformField from './parse-changeset-webform-field';

export default function parseChangesetWebformFields(formSchema, fieldComponentsMap) {
  if (!formSchema) {return;}
  return {
    formFields: (formSchema.fields || []).map(field => {
      return parseChangesetWebformField(field, fieldComponentsMap, formSchema);
    }),
    formSchema: formSchema
  };
}