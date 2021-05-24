import Component from '@ember/component';
import layout from '../../../templates/components/docs/action-handling/after-field-validation-form';

export default Component.extend({
  layout,

  init: function() {
    this._super(...arguments);
// BEGIN-SNIPPET after-field-validation-form.js
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
    afterFieldValidation(formField, changesetWebform, fieldValidationErrors) {
      this.set('name', changesetWebform.changeset.get('name'));
      this.set('email', changesetWebform.changeset.get('email'));
      this.set('lastValidatedField', formField.fieldLabel);
      this.set('lastUpdatedFieldValue', changesetWebform.changeset.get(formField.propertyName))
      this.set('fieldValidationErrors', fieldValidationErrors);
      this.set('allFields', changesetWebform.fields.map(field => field.fieldId).join(', '));
      this.set('formName', changesetWebform.formSettings.formName);
    }
  }
});
//END-SNIPPET
