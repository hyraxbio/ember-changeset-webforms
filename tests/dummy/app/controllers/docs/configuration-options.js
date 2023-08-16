import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    // BEGIN-SNIPPET field-settings-overridden.js
    this.formSchema = {
      formSettings: {
        formName: 'signIn',
        submitButtonText: 'Sign in',
      },
      fieldSettings: {
        hideLabel: true,
      },
      fields: [
        {
          fieldId: 'firstName',
          fieldLabel: 'First name',
          fieldType: 'input',
        },
        {
          fieldId: 'lastName',
          fieldLabel: 'Last name',
          fieldType: 'input',
        },
        {
          fieldId: 'email',
          fieldLabel: 'Email',
          fieldType: 'input',
          inputType: 'email',
          hideLabel: false,
        },
      ],
    };
    // END-SNIPPET
  },
});
