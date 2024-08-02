import Component from '@glimmer/component';

export default class InheritClassSettingsComponent extends Component {
  // BEGIN-SNIPPET inherit-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'inheritClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
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
}
