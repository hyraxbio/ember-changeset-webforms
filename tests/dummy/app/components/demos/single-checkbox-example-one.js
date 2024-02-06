import Component from '@glimmer/component';

  export default class SingleCheckboxExampleOneComponent extends Component {
  
  // BEGIN-SNIPPET single-checkbox-example-1.js
  singleCheckboxExample1FormSchema = {
    formSettings: {
      formName: 'singleCheckboxExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabel: 'I agree to the terms and conditions',
      },
    ],
  };
  // END-SNIPPET

// end-of-conent 
}