import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AfterFieldValidationForm extends Component {
  @tracked lastValidatedField;
  @tracked name;
  @tracked email;
  @tracked lastUpdatedFieldValue;
  @tracked fieldValidationErrors;
  @tracked allFields;

  // BEGIN-SNIPPET after-field-validation-form.js
  nameAndEmailFormSchema = {
    formSettings: {
      formName: 'nameAndEmail',
      submitButtonText: 'Submit', // TODO default setting
      hideLabels: true,
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
        validatesOn: ['insert'],
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
    ],
  };

  @action
  afterFieldValidation(formField, changesetWebform, fieldValidationErrors) {
    this.name = changesetWebform.changeset.get('name');
    this.email = changesetWebform.changeset.get('email');
    this.lastValidatedField = formField.fieldLabel;
    this.lastUpdatedFieldValue = changesetWebform.changeset.get(
      formField.propertyName,
    );
    this.fieldValidationErrors = fieldValidationErrors;
    this.allFields = changesetWebform.fields
      .map((field) => field.fieldId)
      .join(', ');
    this.formName = changesetWebform.formSettings.formName;
  }
}
// END-SNIPPET
