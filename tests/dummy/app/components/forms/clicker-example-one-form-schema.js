// BEGIN-SNIPPET clicker-example-1.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ClickerExampleOneFormSchema extends Component {
  clickerExample1FormSchema = {
    formSettings: {
      formName: 'clickerExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'toggleAdvanced',
        fieldType: 'clicker',
        classNames: {
          clickerElement: ['$inherited', 'btn', 'btn-primary'],
        },
        clickerText: 'Advanced options',
        showAdvanced: false,
      },
      {
        fieldId: 'advanced',
        fieldType: 'input',
        fieldLabel: 'Advanced setting',
        hidden: true,
        advancedSetting: true,
      },
    ],
  };

  @action
  onUserInteractionClicker1(formField, changesetWebform, eventType) {
    if (formField.fieldId === 'toggleAdvanced' && eventType === 'click') {
      formField.showAdvanced = !formField.showAdvanced;
      const advancedFields = changesetWebform.fields.filter(
        (field) => field.advancedSetting,
      );
      advancedFields.forEach((field) => (field.hidden = !field.hidden));
    }
  }
}
// END-SNIPPET
