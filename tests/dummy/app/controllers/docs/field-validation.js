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
      formSettings: {
        formName: 'signup',
        submitSuccessMessage: 'Thank you for signing up.',
        submitButtonText: 'Sign up',
        modelName: 'user', // TODO required?
        clearFormAfterSubmit: true,
        showRollbackChangesetButton: true,
        showClearFormButton: true,
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
        fieldId: 'country',
        fieldLabel: 'Country',
        fieldType: 'powerSelect',
        placeholder: 'Select',
        searchEnabled: true,
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {presence: true, description: 'Nation of origin'}
        }],
        options: this.globalVariables.countries,
      },
      {
        fieldId: 'birthDate',
        fieldLabel: 'Date of Birth',
        fieldType: 'powerDatePicker',
        showTimeSelector: true,
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: {presence: true, description: 'Date of birth'}
        }],
      },
      {
        fieldId: 'acceptTerms',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Do you agree to the terms and conditions?',
        validationRules: [{
          validationMethod: 'validateInclusion',
          arguments: { list: ['true'], message: 'You must accept the terms to continue.'}
        }],
        options: [{
          label: 'I agree',
          value: 'true'
        }, {
          label: 'I do not agree',
          value: 'false'
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
      }, {
        fieldId: 'cookieConsent',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Please select the cookies you consent to',
        validationRules: [{
          validationMethod: 'validateLength',
          arguments: { min: 2, allowNone: false, message: 'You must select at least one cookie consent option.'}
        }],
        options: [{
          label: 'Essential',
          key: 'essential'
        }, {
          label: 'Analytics',
          key: 'analytics'
        }, {
          label: 'Marketing',
          key: 'marketing'
        }]
      }]
    };
    // END-SNIPPET
    
  },
  actions: {
    submit(data) {

    },

    submitSuccess() {

    }
  }
});
