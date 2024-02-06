import Component from '@glimmer/component';

  export default class SingleCheckboxExampleTwoComponent extends Component {
  
  // BEGIN-SNIPPET single-checkbox-example-2.js
  singleCheckboxExample2FormSchema = {
    formSettings: {
      formName: 'singleCheckboxExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelMarkdown:
          'I agree to the __**[terms and conditions here](https://example.com)**__.',
      },
    ],
  };
  // END-SNIPPET

// end-of-conent 
}