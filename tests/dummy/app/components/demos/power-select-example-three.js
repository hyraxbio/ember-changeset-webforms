import Component from '@glimmer/component';

export default class PowerSelectExampleThreeComponent extends Component {
  // BEGIN-SNIPPET power-select-example-3.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        optionComponent: 'forms/power-select-option-component',
        selectedItemComponent: 'forms/power-select-selected-item-component',
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND'],
      },
    ],
  };
  // END-SNIPPET
}
