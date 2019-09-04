export default {
  fieldLabel: 'Phone number',
  fieldId: 'info.phone_number',
  fieldType: 'input',
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }],
  inputType: 'number'
};