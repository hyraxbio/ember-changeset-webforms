export default {
  fieldLabel: 'Email',
  fieldId: 'email',
  fieldType: 'input',
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }, {
    validationMethod: 'validateFormat',
    arguments: { type: 'email' }
  }],
  inputType: 'email'
};