import generateEmberValidatingFormField from './generate-ember-validating-form-field';

export default function generateEmberValidatingFormFields(formSchema, fieldComponentsMap) {
  var generateformFields = function(formSchema, fieldComponentsMap) {
    if (!formSchema) {return;}
    var schemaFields = formSchema.fields;
    var formFields = [];
    if (!schemaFields) {return formFields;}
    schemaFields.forEach(function(field) {
      var fieldObject;
      if (!field.includeLabelOnSubmit) {
        fieldObject = generateEmberValidatingFormField(field, fieldComponentsMap, formSchema);
        formFields.push(fieldObject);
      } else {
        var labelField = {
          fieldId: `${field.fieldId}.label`,
          defaultValue: field.fieldLabel,
          fieldType: 'noDisplay'
        };
        formFields.push(generateEmberValidatingFormField(labelField, fieldComponentsMap, formSchema));
        field.propertyName = `${field.fieldId}.values`;
        formFields.push(generateEmberValidatingFormField(field, fieldComponentsMap, formSchema));
      }
    });
    return formFields;
  };

  return {
    formFields: generateformFields(formSchema, fieldComponentsMap),
    formSchema: formSchema
  };
}