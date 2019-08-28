export default {
  fieldId: 'password',
  fieldLabel: 'Password (Minimum 8 characters)',
  fieldType: 'input',
  showfieldLabel: false,
  validationRules: [{
    'validationMethod': 'required'
  }, {
    'validationMethod': 'isLength',
    'arguments': {
      min: 8,
      max: 72
    }
  }, {
    'validationMethod': 'custom'
  }],
  inputType: 'password'
};