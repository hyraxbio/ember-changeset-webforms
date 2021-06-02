import Component from '@ember/component';
import layout from '../../templates/components/forms/login-form';
export default Component.extend({
  layout,
// BEGIN-SNIPPET login-form.js
  init: function() {
    this._super(...arguments);
    this.formSchema = {
      formSettings: {
        formName: 'loginForm',
        submitButtonText: 'Log in',
        submitButtonClasses: 'btn btn-primary btn-lg btn-block',
        modelName: 'authorisation',
        showResetButton: false,
        hideSuccessValidation: true,
        hideLabels: true
      },
      class: 'login',
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
  }
//END-SNIPPET
});