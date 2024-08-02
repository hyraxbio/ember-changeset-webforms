import Component from '@glimmer/component';

export default class OverrideClassSettingsComponent extends Component {
  // BEGIN-SNIPPET override-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'overrideClassNames',
      hideSubmitButton: true,
    },
    generalClassNames: {
      labelElement: ['form-wide-label-class'],
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
