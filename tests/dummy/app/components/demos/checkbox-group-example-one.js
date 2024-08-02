import Component from '@glimmer/component';

export default class CheckboxGroupExampleOneComponent extends Component {
  // BEGIN-SNIPPET checkbox-group-example-1.js
  formSchema = {
    formSettings: {
      formName: 'checkboxGroupExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'checkboxes1',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Basic usage',
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
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
