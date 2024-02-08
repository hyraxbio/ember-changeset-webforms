import Component from '@glimmer/component';

export default class DemosCustomFieldComponent extends Component {
  // BEGIN-SNIPPET custom-fields-demo.js
  formSchema = {
    formSettings: {
      formName: 'Phone number with country code',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'Name',
        fieldType: 'input',
        fieldLabel: 'Name',
        inputType: 'text',
        // validationEvents: [],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'validateFormat',
            arguments: {
              regex: /^[\d ]*$/,
              message: 'Phone number may only contain numbers and spaces',
            },
          },
        ],
      },
      {
        fieldId: 'phoneNumber',
        fieldType: 'phoneNumberWithCountryCode',
        fieldLabel: 'Phone number',
        defaultValue: '93 1234567890',
        validationEvents: ['focusOutPhoneInput', 'keyUpPhoneNumberInput'],
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: {
              regex: /^[\d -]*$/,
              message:
                'Phone number may only contain numbers, dashes and spaces',
            },
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
