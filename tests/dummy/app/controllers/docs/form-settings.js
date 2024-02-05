import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class FormSettings extends Controller {
  init() {
    super.init(...arguments);
    // BEGIN-SNIPPET no-form-settings-form-schema.js
    this.nothingSpecialFormSchema = {
      formSettings: {
        formName: 'nothingSpecialForm',
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
    // BEGIN-SNIPPET clear-after-submit-form-schema.js
    this.clearFormSchema = {
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

  @action
  doSubmit(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }
}
