// BEGIN-SNIPPET custom-component-clicker.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class customProps {
  @tracked showAdvanced = false;
}
export default class ClickerExampleTwoFormSchema extends Component {
  clickerExample2FormSchema = {
    formSettings: {
      formName: 'clickerExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'toggleAdvanced',
        fieldType: 'clicker',
        classNames: {
          clickerElement: ['$inherited', 'btn'],
        },
        clickerText: 'Advanced options',
        displayComponent: {
          path: 'forms/custom-clicker-component',
          props: {
            buttonType: 'danger',
          },
        },
        customProps: new customProps(),
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
  onUserInteractionClicker1(formField, changesetWebform, eventName) {
    if (formField.fieldId === 'toggleAdvanced' && eventName === 'click') {
      formField.customProps.showAdvanced = !formField.customProps.showAdvanced;
      const advancedFields = changesetWebform.fields.filter(
        (field) => field.advancedSetting,
      );
      advancedFields.forEach((field) => (field.hidden = !field.hidden));
    }
  }
}
// END-SNIPPET
