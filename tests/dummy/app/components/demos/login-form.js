import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  // BEGIN-SNIPPET login-form.js
  formSchema = {
    formSettings: {
      formName: 'login',
      submitButtonText: 'Log in',
      hideSuccessValidation: true,
      hideLabels: true,
      clearFormAfterSubmit: true,
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
  submit(data, chnagesetWebform) {
    // Action that runs when the user clicks submit.
    return;
  }
  @action
  submitSuccess(response, changesetWebform) {
    // Action that runs after a success response from the submit action above.
    alert('Success!');
  }

  @action
  submitError(error, changesetWebform) {
    // Action that runs after an error response from the submit action above.
    alert('Error!');
  }
}
//END-SNIPPET
