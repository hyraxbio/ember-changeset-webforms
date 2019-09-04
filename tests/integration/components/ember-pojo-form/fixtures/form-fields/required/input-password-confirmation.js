export default {
  fieldId: 'password_confirmation',
  fieldLabel: 'Confirm password',
  fieldType: 'input',
  showfieldLabel: false,
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }, {
    validationMethod: 'validateLength',
    arguments: { min: 8, max: 72 }
  }, {
    validationMethod: 'validateConfirmation',
    arguments: { on: 'password'}
  }],
  inputType: 'password'
};