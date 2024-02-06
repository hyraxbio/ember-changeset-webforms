import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class FormSettings extends Controller {
  // BEGIN-SNIPPET no-form-settings-form-schema.js
  nothingSpecialFormSchema = {
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


  @action
  doSubmit(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }
}
