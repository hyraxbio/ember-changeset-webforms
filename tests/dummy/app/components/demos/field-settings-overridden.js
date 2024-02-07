import Component from '@glimmer/component';

export default class FieldSettingsOverriddenComponent extends Component {
  // BEGIN-SNIPPET app-wide-class-settings.js"
  formSchema = {
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
