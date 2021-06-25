import { inject as service } from '@ember/service';
// BEGIN-SNIPPET import-custom-validators.js
import Controller from '@ember/controller';

export default Controller.extend({
//END_SNIPPET
  globalVariables: service(),
  init: function () {
    this._super(...arguments);
    // BEGIN-SNIPPET signup-form.js
    this.signUpFormSchema = {
      settings: {
        formName: 'signup',
        submitSuccessMessage: 'Thank you for signing up.',
        submitButtonText: 'Sign up',
        modelName: 'user', // TODO required?
        resetAfterSubmit: true
      },
      fields: [{
        fieldId: 'name',
        fieldLabel: 'Name',
        fieldType: 'input',
        validationEvents: ['insert', 'keyUp'],
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'text'
      }, 
      {
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
      },
      {
        fieldId: 'recoveryEmail',
        fieldLabel: 'Recovery email',
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
      },
      {
        fieldId: 'password',
        fieldLabel: 'Password (Minimum 8 characters)',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateLength',
          arguments: { min: 8, max: 72 }
        }],
        inputType: 'password'
      },
      {
        fieldId: 'details.country',
        fieldLabel: 'Country',
        fieldType: 'powerSelect',
        placeholder: 'Select',
        searchEnabled: true,
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {presence: true, description: 'Nation of origin'}
        }],
        options: this.get('globalVariables.countries'),
      },
      {
        fieldId: 'acceptTerms',
        fieldType: 'radioButtonGroup',
        label: 'Do you agree to the terms and conditions?',
        validationRules: [{
          validationMethod: 'validateInclusion',
          arguments: { list: ['true'], message: 'You must accept the terms to continue.'}
        }],
        options: [{
          'label': 'I agree',
          'value': 'true'
        }, {
          'label': 'I do not agree',
          'value': 'false'
        }]
      },
      {
        fieldId: 'confirmHuman',
        fieldType: 'singleCheckbox',
        checkBoxLabel: 'Are you human',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {presence: true, message: 'Please confirm that you are not a robot.'}
        }],
      }]
    };
    // END-SNIPPET
    
  },
  actions: {
    submit() {

    },

    saveSuccess() {

    }
  }
});
