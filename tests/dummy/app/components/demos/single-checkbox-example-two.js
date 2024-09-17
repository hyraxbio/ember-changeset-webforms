import Component from '@glimmer/component';

export default class SingleCheckboxExampleTwoComponent extends Component {
  // BEGIN-SNIPPET single-checkbox-example-2.js
  formSchema = {
    formSettings: {
      formName: 'singleCheckboxExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkboxLabelMarkdown:
          'I agree to the __**[terms and conditions here](https://example.com)**__.',
      },
    ],
  };
  // END-SNIPPET
}
