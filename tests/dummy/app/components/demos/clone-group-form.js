import Component from '@glimmer/component';

export default class CloneGroupFormComponent extends Component {
  // BEGIN-SNIPPET clone-group-form.js
  formSchema = {
    formSettings: {
      formName: 'addEmails',
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
          validatesOn: ['insert'],
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
