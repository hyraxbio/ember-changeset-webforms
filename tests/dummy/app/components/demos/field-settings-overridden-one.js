import Component from '@glimmer/component';

export default class FieldSettingsOverriddenOneComponent extends Component {
  // BEGIN-SNIPPET field-settings-overridden.js
  formSchema = {
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
}
