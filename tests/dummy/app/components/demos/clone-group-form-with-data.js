import Component from '@glimmer/component';

export default class CloneGroupFormWithFormWithDataComponent extends Component {
  // BEGIN-SNIPPET clone-group-form-data.js
  data = {
    emails: [
      'tobias@timosol.com',
      'tobias@timosol.com',
      null,
      'lindsay@timosol.com',
      'maeby@timosol.com',
      'funke@timosil.com',
    ],
  };
  // END-SNIPPET
  // BEGIN-SNIPPET clone-group-form.js
  formSchema = {
    formSettings: {
      formName: 'addEmailsForm',
      submitButtonText: 'Submit',
      clearFormAfterSubmit: true,
    },
    fields: [
      {
        fieldId: 'emails',
        fieldLabel: 'User emails',
        fieldType: 'clone-group',
        cloneField: ['cwf-clone-field'],
        maxClonesReached: ['cwf-max-clones-reached'],
        minClones: 2,
        maxClones: 4,
        validationRules: [
          {
            validationMethod: 'validateLength',
            arguments: {
              description: 'emails',
              message: 'Too many {description} (maximum is {max}).',
              max: 4,
            },
          },
        ],
        cloneButtonText: 'Add email address',
        cloneFieldSchema: {
          fieldLabel: 'Email',
          fieldType: 'input',
          inputType: 'email',
          hideLabel: true,
          validationEvents: ['insert'],
          validationRules: [
            {
              validationMethod: 'validateFormat',
              arguments: { type: 'email' },
            },
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'uniqueClone',
              arguments: {
                description: 'email',
              },
            },
          ],
        },
      },
    ],
  };
  //END-SNIPPET
}
