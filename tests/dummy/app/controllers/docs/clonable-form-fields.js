import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    // BEGIN-SNIPPET clone-form.js
    this.formSchema = {
      settings: {
        formName: 'inviteUsersForm',
        submitButtonText: 'Submit',
        resetAfterSubmit: true
      },
      fields: [{
        fieldId: 'userEmails',
        fieldLabel: 'User emails',
        hideLabel: true,
        fieldType: 'clonable',
        clonable: true,
        minClones: 2,
        maxClones: 4,
        cloneButtonText: 'Add email',
        templateSettings: {
          removeCloneIcon: 'svg-repo/icons/icon-trash', // TODO requires default setting
        },
        cloneFieldSchema: {
          fieldLabel: 'Email',
          fieldType: 'input',
          inputType: 'email',
          hideLabel: true,
          validationRules: [{
            validationMethod: 'validateFormat',
            arguments: { type: 'email' }
          }, {
            validationMethod: 'validatePresence',
            arguments: true
          },
          {
            validationMethod: 'uniqueArray'
          }]
        }
      }]
    };
    //END-SNIPPET
  },

  actions: {
    submit() {

    }
  }
});