import Component from '@glimmer/component';

export default class InputExampleTwoComponent extends Component {
  // BEGIN-SNIPPET input-example-2.js
  formSchema = {
    formSettings: {
      formName: 'inputExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'password',
        fieldType: 'input',
        inputType: 'password',
        fieldLabel: 'Password',
        placeholder: 'Enter your password here',
      },
    ],
  };
  // END-SNIPPET
}
