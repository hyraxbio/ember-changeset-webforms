import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import customValidators from '../../validators';
export default class DemosCustomFieldComponent extends Component {
  customValidators = customValidators;
  @tracked phoneNumber;
  // BEGIN-SNIPPET custom-fields-demo.js
  formSchema = {
    formSettings: {
      formName: 'Phone number with country code',
    },
    fields: [
      {
        fieldId: 'phoneNumber',
        fieldType: 'phoneNumberWithCountryCode',
        fieldLabel: 'Phone number',
        showValidationWhenFocussed: false,
        validatesOn: ['focusOutPhoneNumberInput'],
        validationRules: [
          {
            validationMethod: 'validatePhoneNumber',
          },
        ],
      },
    ],
  };
  // END-SNIPPET

  @action
  updatePhoneNumber(formField, changesetWebform) {
    if (changesetWebform.changeset.isValid) {
      this.phoneNumber = changesetWebform.changeset.get('phoneNumber');
    } else {
      this.phoneNumber = null;
    }
  }
}
