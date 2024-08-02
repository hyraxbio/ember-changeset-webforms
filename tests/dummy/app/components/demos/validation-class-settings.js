import Component from '@glimmer/component';

export default class ValidationClassSettingsComponent extends Component {
  // BEGIN-SNIPPET validation-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'validationClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['$validationClassNames'],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        showValidationWhenFocussed: true,

        // validatesOn: ['keyUp'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
