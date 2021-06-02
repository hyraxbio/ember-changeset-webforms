import Controller from '@ember/controller';

// BEGIN-SNIPPET login-form.js
export default Controller.extend({
  init: function() {
    this._super(...arguments);
    this.formSchema = {
      formSettings: {
        formName: 'loginForm',
        submitButtonText: 'Log in',
        showResetButton: false,
        hideSuccessValidation: true,
        hideLabels: true
      },
      fields: [{
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' }
        }],
        inputType: 'text',
        class: 'email'
      },
      {
        fieldId: 'password',
        fieldLabel: 'Password',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'password',
        class: 'password'
      }]
    };
  },

  actions: {
    submit() {
      return true;
    },

    saveSuccess() {
      alert('Success!');
    }
  }
});
//END-SNIPPET
