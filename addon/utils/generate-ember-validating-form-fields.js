import EmberObject from '@ember/object';
import generateEmberValidatingFormField from './generate-ember-validating-form-field';

export default function generateEmberValidatingFormFields(formSchema, fieldComponentsMap) {
  var generateFormMetaData = function(formSchema) {
    var formMetaData = EmberObject.create(formSchema.settings);
    if (formMetaData.submitSuccessMessage === null || formMetaData.submitSuccessMessage === undefined) {
      formMetaData.submitSuccessMessage = "Success";
    }

    if (formMetaData.resetAfterSubmit === null || formMetaData.resetAfterSubmit === undefined) {
      formMetaData.resetAfterSubmit = true;
    }

    if (formMetaData.submitAsync === null || formMetaData.submitAsync === undefined) {
      formMetaData.submitAsync = true;
    }

    return formMetaData;
  };

  var generateformFields = function(formSchema, fieldComponentsMap) {
    if (!formSchema) {return;}
    var schemaFields = formSchema.fields;
    var formFields = [];
    if (!schemaFields) {return formFields;}
    schemaFields.forEach(function(field) {
      var fieldObject = generateEmberValidatingFormField(field, fieldComponentsMap, formSchema);
      formFields.push(fieldObject);
    });
    return formFields;
  };

  return {
    formFields: generateformFields(formSchema, fieldComponentsMap),
    formMetaData: generateFormMetaData(formSchema),
    formSchema: formSchema
  };
}