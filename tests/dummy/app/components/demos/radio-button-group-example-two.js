import Component from '@glimmer/component';

export default class RadioButtonGroupExampleTwoComponent extends Component {
  // BEGIN-SNIPPET radio-button-group-example-2.js
  formSchema = {
    formSettings: {
      formName: 'radioButtonGroupExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'radioButtons2',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          path: 'forms/component-for-all-radio-options',
          props: {
            infoLink: 'https://example.com',
          },
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
          {
            label: 'Option 3',
            value: '3',
            labelComponent: {
              path: 'forms/component-for-single-radio-option',
              props: {
                info: 'This text was passed to the label component dynamically for this option, via the labelComponent.props object.',
              },
            },
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
