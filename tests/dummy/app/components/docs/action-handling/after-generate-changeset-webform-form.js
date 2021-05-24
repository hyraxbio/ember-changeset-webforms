import Component from '@ember/component';
import layout from '../../../templates/components/docs/action-handling/after-generate-changeset-webform-form';

export default Component.extend({
  layout,

  init: function() {
    this._super(...arguments);
// BEGIN-SNIPPET after-generate-changeset-webform-form.js
    this.formSchema = {
      settings: {
        formName: 'nameAndEmail',
        submitButtonText: 'Submit', // TODO default setting
        showResetButton: false,
        hideLabels: true
      },
      fields: [{
        fieldId: 'name',
        fieldLabel: 'Name',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'text'
      }, {
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationEvents: ['insert'],
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' }
        }],
        inputType: 'email'
      },]
    };
  },

  actions: {
    afterGenerateChangesetWebform(webform) {
      console.log(webform);
      
    }
  }
});
//END-SNIPPET
