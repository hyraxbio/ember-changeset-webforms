import Component from '@ember/component';
import layout from '../../templates/components/forms/signup';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  globalVariables: service(),
  // BEGIN-SNIPPET signup-form.js
  init() {
    this._super(...arguments);
    this.signUpFormSchema = {
      formSettings: {
        formName: 'signUpForm',
        submitButtonText: 'Create my Account',
      },
      fieldSettings: {
        hideLabel: true,
      },
      fields: [
        {
          fieldId: 'name',
          fieldLabel: 'Name',
          fieldType: 'input',
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
          ],
          inputType: 'text',
        },
        {
          fieldId: 'email',
          fieldLabel: 'Email',
          fieldType: 'input',
          validationEvents: ['insert'],
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'validateFormat',
              arguments: { type: 'email' },
            },
          ],
          inputType: 'email',
        },
        {
          fieldId: 'birthDate',
          fieldLabel: 'Date of birth',
          fieldType: 'powerDatePicker',
          closeDatePickerOnSelect: true,
        },
        {
          fieldId: 'password',
          fieldLabel: 'Password (Minimum 8 characters)',
          fieldType: 'input',
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'validateLength',
              arguments: { min: 8, max: 72 },
            },
          ],
          inputType: 'password',
        },
        {
          fieldId: 'password_confirmation',
          fieldLabel: 'Confirm password',
          fieldType: 'input',
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'validateLength',
              arguments: { min: 8, max: 72 },
            },
            {
              validationMethod: 'validateConfirmation',
              arguments: { on: 'password' },
            },
          ],
          inputType: 'password',
        },
        {
          fieldId: 'details.country',
          fieldLabel: 'Country',
          fieldType: 'powerSelect',
          placeholder: 'Select',
          searchEnabled: true,
          validationRules: [
            {
              validationMethod: 'validatePresence',
              arguments: { presence: true, description: 'Country' },
            },
          ],
          options: this.globalVariables.countries,
        },
        {
          fieldId: 'acceptTerms',
          fieldType: 'radioButtonGroup',
          labelComponent: 'notices/terms-label',
          validationRules: [
            {
              validationMethod: 'validateInclusion',
              arguments: {
                list: ['true'],
                message: 'You must accept the terms to continue.',
              },
            },
          ],
          options: [
            {
              label: 'I agree',
              value: 'true',
            },
            {
              label: 'I do not agree',
              value: 'false',
            },
          ],
        },
        {
          fieldId: 'preferences.surveillance',
          fieldType: 'singleCheckbox',
          checkBoxLabel: 'Allow my data to be used to be collected.',
          defaultValue: false,
        },
      ],
    };
  },
  // END-SNIPPET
  actions: {
    submit() {},

    submitSuccess() {},
  },
});
