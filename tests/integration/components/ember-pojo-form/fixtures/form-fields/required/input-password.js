export default {
  fieldId: 'password',
  fieldLabel: 'Password (Minimum 8 characters)',
  fieldType: 'input',
  showfieldLabel: false,
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }, {
    validationMethod: 'validateLength',
    arguments: { min: 8, max: 72 }
  }],
  inputType: 'password'
};