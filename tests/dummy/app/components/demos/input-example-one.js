import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class InputExampleOneComponent extends Component {
  // BEGIN-SNIPPET input-example-1.js
  formSchema = {
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

  @action
  onUserInteraction(...args) {
    console.log(args);
  }
  // END-SNIPPET
}
