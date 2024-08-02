import Component from '@glimmer/component';

export default class ClearAfterSubmitFormComponent extends Component {
  // BEGIN-SNIPPET clear-after-submit-form-schema.js
  formSchema = {
    formSettings: {
      formName: 'clearAfterSubmitForm',
      clearFormAfterSubmit: true,
      submitButtonText: 'Create account',
      showClearFormButton: true,
      showRollbackChangesetButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'email',
        fieldType: 'input',
        fieldLabel: 'email',
        defaultValue: 'test@email.com',
      },
    ],
  };
  // END-SNIPPET
}
