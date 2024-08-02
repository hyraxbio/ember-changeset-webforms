import Component from '@glimmer/component';

// TODO documnet that classnames does nothing on a clone-group field (Also, is this a bug?)
export default class FieldSpecificClassSettingsComponent extends Component {
  // BEGIN-SNIPPET field-specific-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'fieldClassNames',
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
        classNames: {
          labelElement: ['$inherited', 'field-specific-class-names'],
        },
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
