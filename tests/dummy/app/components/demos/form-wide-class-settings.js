import Component from '@glimmer/component';

export default class FormWideClassSettingsComponent extends Component {
  // BEGIN-SNIPPET form-wide-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'formClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
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
