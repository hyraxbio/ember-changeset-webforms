import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

export default class ConfigureClassnames extends Controller {
  fieldTypes = addonDefaults.fieldTypes.map((item) => item.fieldType);

  // BEGIN-SNIPPET app-wide-class-settings.js"
  appWideClassesFormSchema = {
    formSettings: {
      formName: 'appClassNames',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET










}
