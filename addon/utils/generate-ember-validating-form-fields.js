import generateEmberValidatingFormField from './generate-ember-validating-form-field';

export default function generateEmberValidatingFormFields(formSchema, fieldComponentsMap) {
  if (!formSchema) {return;}
  return {
    formFields: (formSchema.fields || []).map(field => {
      return generateEmberValidatingFormField(field, fieldComponentsMap, formSchema);
    }),
    formSchema: formSchema
  };
}