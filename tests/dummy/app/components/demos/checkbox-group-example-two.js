import Component from '@glimmer/component';

export default class CheckboxGroupExampleTwoComponent extends Component {
  // BEGIN-SNIPPET checkbox-group-example-2.js
  formSchema = {
    formSettings: {
      formName: 'checkboxGroupExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'checkboxes2',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          path: 'forms/component-for-all-checkbox-options',
          props: {
            infoLink: 'https://example.com',
          },
        },
        options: [
          {
            label: 'Option 1',
            key: '1',
          },
          {
            label: 'Option 2',
            key: '2',
          },
          {
            label: 'Option 3',
            key: '3',
            labelComponent: {
              path: 'forms/component-for-single-checkbox-option',
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
