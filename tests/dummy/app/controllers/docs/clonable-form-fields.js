import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.cloneGroupFieldAddonDefaults = addonDefaults.fieldTypes.find((item) => item.fieldType === 'clone-group');

    // BEGIN-SNIPPET clone-group-form-data.js
    this.data = {
      emails: ['tobias@timosol.com', 'tobias@timosol.com', null, 'lindsay@timosol.com', 'maeby@timosol.com', 'funke@timosil.com'],
    };
    // END-SNIPPET
    // BEGIN-SNIPPET clone-group-form.js
    this.formSchema = {
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
    // BEGIN-SNIPPET clone-group-form-keyup.js
    this.formSchema2 = {
      formSettings: {
        formName: 'addEmailsForm',
        submitButtonText: 'Submit',
        clearFormAfterSubmit: true,
      },

      fields: [
        {
          fieldId: 'countryCodes',
          fieldLabel: 'Country ISO codes',
          fieldType: 'clone-group',
          minClones: 2,
          cloneFieldSchema: {
            fieldLabel: 'Country code',
            fieldType: 'input',
            inputType: 'text',
            hideLabel: true,
            validationEvents: ['keyUp'],
            validationRules: [
              {
                validationMethod: 'validateLength',
                arguments: {
                  max: 3,
                  description: 'Country code',
                },
              },
            ],
          },
        },
      ],
    };
    //END-SNIPPET
  },

  actions: {
    submit() {},
  },
});
