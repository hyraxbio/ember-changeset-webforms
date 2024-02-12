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
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'phoneNumber',
        fieldType: 'phoneNumberWithCountryCode',
        fieldLabel: 'Phone number',
        showValidationWhenFocussed: false,
        validatesOn: ['focusOutPhoneNumberInput'],
        alwaysValidateOn: [],
        validationRules: [
          {
            validationMethod: 'validatePhoneNumber',
          },
          // {
          //   validationMethod: 'validateFormat',
          //   arguments: {
          //     regex: /^\(.+?\)/,
          //     message: 'Please select a country code',
          //   },
          // },
          // {
          //   validationMethod: 'validateFormat',
          //   arguments: {
          //     regex: /^\(.*?\)[\d -]*$/,
          //     message:
          //       'Phone number may only contain numbers, dashes and spaces',
          //   },
          // },
        ],
      },
    ],
  };
  // END-SNIPPET

  @action
  updatePhoneNumber(formField, changesetWebform) {
    changesetWebform.changeset.validate().then((fieldValidationErrors) => {
      console.log(changesetWebform.changeset.isValid);
    });
    if (changesetWebform.changeset.isValid) {
      this.phoneNumber = changesetWebform.changeset.get('phoneNumber');
    } else {
      this.phoneNumber = 'invalid';
    }
  }
}
