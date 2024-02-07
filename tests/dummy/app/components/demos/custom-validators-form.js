// BEGIN-SNIPPET custom-validators-form.js
import Component from '@glimmer/component';
import customValidators from '../../validators';

export default class IntegratingCustomValidators extends Component {
  customValidators = customValidators;

  formSchema = {
    formSettings: {
      formName: 'unique',
      submitButtonText: 'Submit',
    },
    fields: [
      {
        fieldId: 'primaryEmail',
        fieldLabel: 'Primary Email',
        fieldType: 'input',
        validationRules: [
          {
            validationMethod: 'validateUniqueness',
            arguments: {
              descriptionsMap: {
                primaryEmail: 'primary email',
                recoveryEmail: 'recovery email',
              },
            },
          },
        ],
        inputType: 'email',
      },
      {
        fieldId: 'recoveryEmail',
        fieldLabel: 'Recovery Email',
        fieldType: 'input',
        validationRules: [
          {
            validationMethod: 'validateUniqueness',
            arguments: {
              descriptionsMap: {
                primaryEmail: 'primary email',
                recoveryEmail: 'recovery email',
              },
            },
          },
        ],
        inputType: 'email',
      },
    ],
  };
}
// END-SNIPPET
