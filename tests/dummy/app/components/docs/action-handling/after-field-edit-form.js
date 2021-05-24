import Component from '@ember/component';
import layout from '../../../templates/components/docs/action-handling/after-field-edit-form';


export default Component.extend({
  layout,
  init: function() {
    this._super(...arguments);
// BEGIN-SNIPPET after-field-edit-action-form.js
    this.userNamesFormSchema = {
      settings: {
        formName: 'names',
        submitButtonText: 'Submit', // TODO default setting
        showResetButton: false,
        hideLabels: true
      },
      fields: [{
        fieldId: 'firstName',
        fieldLabel: 'First name',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'text'
      }, {
        fieldId: 'lastName',
        fieldLabel: 'Last name',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'text'
      }]
    };
  },

  actions: {
    afterFieldEdit(formField, changesetWebform) {
      console.log(formField)
      this.set('fullName', `${changesetWebform.changeset.get('firstName') || ''} ${changesetWebform.changeset.get('lastName') || ''}`);
      this.set('lastUpdateField', formField.fieldLabel);
      this.set('formName', changesetWebform.formSettings.formName);
    }
  }
});
//END-SNIPPET
// TODO formSettings should be editable- ie should pass the class.
