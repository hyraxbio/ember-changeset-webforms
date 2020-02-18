import Component from '@ember/component';

export default Component.extend({
  classNames: ['form-container'],
  classNameBindings: ['class'],

  actions: {
    saveSuccess: function(response, formFields, formSettings) {
      var successMessage = {
        'type': 'success',
        'content': formSettings.submitSuccessMessage,
      };
      this.setProperty('systemMessage', successMessage);
    },

    saveFail: function(errorResponse) {
      var errorDetail = "test";
      var errorMessage = {
        'name': 'errorErrors',
        'type': 'error',
        'sticky': true,
        'content': errorDetail
      };
      this.setProperty('systemMessage', errorMessage);
    },

    formValidationFailed: function(formFields, formSettings) {
      var errorMessage = {
        'name': 'errorMessage',
        'type': 'error',
        'sticky': true,
        'content': 'Some fields have errors which must be fixed before continuing.'
      };
      this.setProperty('systemMessage', errorMessage);
    },

    formValidationPassed: function() {
      this.setProperty('systemMessage', null);
    },

    resetForm: function(formSchema) {
      //
      // this.set("formFields", generateEmberValidatingFormFields(formSchema));
      // this.set('processedFormSchema', generateEmberValidatingFormFields(formSchema));
    }
  }
});
