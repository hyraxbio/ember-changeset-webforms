import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    // BEGIN-SNIPPET clone-group-form-data.js
    this.data = {
      emails: ['tobias@timosol.com', 'tobias@timosol.com', null, 'lindsay@timosol.com', 'maeby@timosol.com', 'funke@timosil.com']
    };
    // END-SNIPPET
    // BEGIN-SNIPPET clone-group-form.js
    this.formSchema = {
      settings: {
        formName: 'addEmailsForm',
        submitButtonText: 'Submit',
        resetAfterSubmit: true
      },

      fields: [{
        fieldId: 'emails',
        fieldLabel: 'User emails',
        fieldType: 'clone-group',
        minClones: 2,
        maxClones: 4,
        validationRules: [{
          validationMethod: 'validateLength',
          arguments: {
            description: 'emails',
            message: 'Too many {description} (maximum is {max}).',
            max: 4}
        }],
        cloneButtonText: 'Add email',
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
          }, {
            validationMethod: 'uniqueArray',
            arguments: {
              description: 'email'
            }
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
