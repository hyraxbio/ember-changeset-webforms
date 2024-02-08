import Controller from '@ember/controller';
import { action } from '@ember/object';
// BEGIN-SNIPPET login-form.js
export default class Application extends Controller {
  loginFormSchema = {
    formSettings: {
      formName: 'login',
      submitButtonText: 'Log in',
      hideSuccessValidation: true,
      hideLabels: true,
    },
    fields: [
      {
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
        ],
        inputType: 'text',
        class: 'email',
      },
      {
        fieldId: 'password',
        fieldLabel: 'Password',
        fieldType: 'input',
        hideLabel: true,
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
        inputType: 'password',
        class: 'password',
      },
    ],
  };

  @action
  submit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  @action
  submitSuccess() {
    console.log('Success!');
  }
}

//END-SNIPPET
