export default {
  fieldId: 'password_confirmation',
  fieldLabel: 'Confirm password',
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