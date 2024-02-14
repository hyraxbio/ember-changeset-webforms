// BEGIN-SNIPPET custom-fields-demo.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import customValidators from '../../validators';

export default class DemosCustomFieldUsageComponent extends Component {
  customValidators = customValidators;
  @tracked phoneNumber;
  formSchema = {
    formSettings: {
      formName: 'Phone number with country code',
    },
    fields: [
      {
        fieldId: 'phoneNumber',
        fieldType: 'phoneNumberWithCountryCode',
        fieldLabel: 'Phone number',
        validatesOn: ['focusOutPhoneNumberInput'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'validatePhoneNumber',
          },
        ],
      },
    ],
  };

  @action
  updatePhoneNumber(formField, changesetWebform) {
    if (changesetWebform.changeset.isValid) {
      this.phoneNumber = formField.fieldValue;
    } else {
      this.phoneNumber = null;
    }
  }
}
// END-SNIPPET
