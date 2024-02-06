import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class OnFieldValueChange extends Component {
  @tracked fullName;
  // BEGIN-SNIPPET after-field-edit-action-form.js
  userNamesFormSchema = {
    formSettings: {
      formName: 'names',
      submitButtonText: 'Submit', // TODO default setting
      hideLabels: true,
    },
    fields: [
      {
        fieldId: 'firstName',
        fieldLabel: 'First name',
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
        fieldId: 'lastName',
        fieldLabel: 'Last name',
        fieldType: 'input',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
        inputType: 'text',
      },
    ],
  };

  @action
  onFieldValueChange(formField, changesetWebform) {
    this.fullName = `${changesetWebform.changeset.get('firstName') || ''} ${changesetWebform.changeset.get('lastName') || ''}`;
    this.lastUpdateField = formField.fieldLabel;
    this.formName = changesetWebform.formSettings.formName;
  }
}
//END-SNIPPET
// TODO formSettings should be editable- ie should pass the class.
