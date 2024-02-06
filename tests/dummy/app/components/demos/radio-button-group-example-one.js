import Component from '@glimmer/component';

export default class RadioButtonGroupExampleOneComponent extends Component {
  // BEGIN-SNIPPET radio-button-group-example-1.js
  radioButtonGroupExample1FormSchema = {
    formSettings: {
      formName: 'radioButtonGroupExample1',
      hideSubmitButton: true,
    },
    fields: [
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
          {
            label: 'Option 3',
            value: '3',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  // end-of-conent
}
