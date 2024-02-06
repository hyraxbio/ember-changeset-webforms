import Component from '@glimmer/component';

  export default class ValidationClassSettingsComponent extends Component {
  
  // BEGIN-SNIPPET validation-class-settings.js"
  validationClassesFormSchema = {
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
        validationEvents: ['keyUp'],
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

// end-of-conent 
}