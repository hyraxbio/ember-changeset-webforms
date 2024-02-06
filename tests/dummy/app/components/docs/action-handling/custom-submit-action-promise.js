import { action } from '@ember/object';
// BEGIN-SNIPPET forgot-password-form.js
import Component from '@glimmer/component';

export default class CustomSubmitActionPromise extends Component {
  formSchema = {
    formSettings: {
      formName: 'forgotPasswordForm',
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
      },
    ],
  };

  @action
  submitAction(_changesetData, changesetWebform) {
    return changesetWebform.changeset.save().then((response) => {
      return this.fetchPromise(
        '/forgot-password' +
          '?email=' +
          encodeURIComponent(response.data.email),
      );
    });
  }

  @action
  submitSuccess(submitActionResponse, changesetWebform) {
    alert('Success');
  }

  @action
  submitError(error, chnagesetWebform) {
    alert('Fail');
  }
}
// END-SNIPPET
