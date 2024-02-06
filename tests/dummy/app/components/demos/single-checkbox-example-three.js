import Component from '@glimmer/component';

  export default class SingleCheckboxExampleThreeComponent extends Component {
  
  // BEGIN-SNIPPET single-checkbox-example-3.js
  singleCheckboxExample3FormSchema = {
    formSettings: {
      formName: 'singleCheckboxExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelComponent: {
          path: 'forms/component-for-single-checkbox-option',
          props: {
            info: 'Some additional info',
          },
        },
      },
    ],
  };
  // END-SNIPPET

// end-of-conent 
}