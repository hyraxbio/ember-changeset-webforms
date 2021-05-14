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
        fieldId: 'invitation',
        fieldLabel: 'User email',
        fieldType: 'clonable',
        clonable: true,
        hideLabel: true,
        minClones: 2,
        maxClones: 4,
        cloneButtonText: 'Add another invitation',
        templateSettings: {
          removeCloneIcon: 'svg-repo/icons/icon-trash',
        },
        cloneFieldSchema: {
          fieldLabel: 'Email',
          fieldType: 'input',
          inputType: 'email',
          hideLabel: true,
          validationEvents: ['insert'],
          validationRules: [{
            validationMethod: 'validateFormat',
            arguments: { type: 'email' }
          }, {
            validationMethod: 'validatePresence',
            arguments: true
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
