// BEGIN-SNIPPET forgot-password-form.js
import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.formSchema = {
      settings: {
        formName: 'forgotPasswordForm',
      },
      fields: [{
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, 
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' }
        }]
      }]
    };
  },

  actions: {
    submitAction(_changesetData, changesetWebform) {
      return changesetWebform.changeset.save().then(response => {
        return this.fetchPromise('/forgot-password' + '?email=' + encodeURIComponent(response.data.email));
      });
    },

    saveSuccess(submitActionResponse, changesetWebform) {
      alert('Success');
    },

    saveFail(error, chnagesetWebform) {
      alert('Fail');
    }
  }
});
// END-SNIPPET
