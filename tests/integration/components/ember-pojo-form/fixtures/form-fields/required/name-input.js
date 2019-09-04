export default {
  fieldLabel: 'Name',
  fieldId: 'name',
  fieldType: 'input',
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }],
  inputType: 'text'
};