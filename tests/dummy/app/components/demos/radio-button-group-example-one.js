import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class RadioButtonGroupExampleOneComponent extends Component {
  @tracked currentValue;
  // BEGIN-SNIPPET radio-button-group-example-1.js
  formSchema = {
    formSettings: {
      formName: 'radioButtonGroupExample',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'rgbColours',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Select colour',
        options: [
          {
            label: 'Red',
            value: 'ff0000',
          },
          {
            label: 'Green',
            value: '00ff00',
          },
          {
            label: 'Blue',
            value: '0000ff',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  @action
  onFieldValueChange(formField, _changesetWebform) {
    this.currentValue = formField.fieldValue;
  }
}
