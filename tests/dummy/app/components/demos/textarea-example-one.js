import Component from '@glimmer/component';

export default class TextareaExampleOneComponent extends Component {
  // BEGIN-SNIPPET textarea-example-1.js
  formSchema = {
    formSettings: {
      formName: 'textareaExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'description',
        fieldType: 'textarea',
        fieldLabel: 'Description',
        placeholder: 'Enter your description here',
      },
    ],
  };
  // END-SNIPPET
}
