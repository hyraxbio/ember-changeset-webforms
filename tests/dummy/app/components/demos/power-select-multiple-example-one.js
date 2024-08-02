import Component from '@glimmer/component';

export default class PowerSelectMultipleExampleOneComponent extends Component {
  // BEGIN-SNIPPET power-select-multiple-example-1.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectMultipleExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        searchEnabled: true,
        fieldId: 'country',
        fieldType: 'powerSelect',
        multipleSelection: true,
        allowFreeTyping: true,
        fieldLabel: 'Select countries',
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND'],
      },
    ],
  };
  // END-SNIPPET
}
