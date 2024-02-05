import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/docs/action-handling/after-field-validation-form';

@templateLayout(layout)
export default class AfterFieldValidationForm extends Component {
  init() {
    super.init(...arguments);
    // BEGIN-SNIPPET after-field-validation-form.js
    this.nameAndEmailFormSchema = {
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
      ],
    };
  }

  @action
  afterFieldValidation(formField, changesetWebform, fieldValidationErrors) {
    this.set('name', changesetWebform.changeset.get('name'));
    this.set('email', changesetWebform.changeset.get('email'));
    this.set('lastValidatedField', formField.fieldLabel);
    this.set(
      'lastUpdatedFieldValue',
      changesetWebform.changeset.get(formField.propertyName),
    );
    this.set('fieldValidationErrors', fieldValidationErrors);
    this.set(
      'allFields',
      changesetWebform.fields.map((field) => field.fieldId).join(', '),
    );
    this.set('formName', changesetWebform.formSettings.formName);
  }
}
//END-SNIPPET
