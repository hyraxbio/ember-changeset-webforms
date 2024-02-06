import Component from '@glimmer/component';

  export default class InputExampleOneComponent extends Component {
  
  // BEGIN-SNIPPET input-example-1.js
  inputExample1FormSchema = {
    formSettings: {
      formName: 'inputExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };
  // END-SNIPPET

// end-of-conent 
}