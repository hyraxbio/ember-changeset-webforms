export default {
  fieldLabel: 'Email',
  fieldId: 'email',
  fieldType: 'input',
  validationRules: [{'validationMethod': 'required'}, {'validationMethod': 'isEmail'}],
  inputType: 'text'
};