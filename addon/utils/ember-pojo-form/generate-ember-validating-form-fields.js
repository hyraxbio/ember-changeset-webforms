import EmberObject from '@ember/object';
import generateEmberValidatingFormField from './generate-ember-validating-form-field';

export default function generateEmberValidatingFormFields(formSchema, mode) {
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

  var generateformFields = function(formSchema, mode) {
    if (!formSchema) {return;}
    var schemaFields = formSchema.fields;
    var formFields = [];
    if (!schemaFields) {return formFields;}
    schemaFields.forEach(function(field, index) {
      var fieldObject = generateEmberValidatingFormField(field, index, formSchema, mode);
      formFields.push(fieldObject);
    });
    return formFields;
  };

  var generateChangeset = function(formFields) {
    formFields.forEach(formField => {

    });
    return formFields;
  };

  return {
    formFields: generateformFields(formSchema, mode),
    formMetaData: generateFormMetaData(formSchema),
    formSchema: formSchema
  };
}