export default {
  fieldId: 'gender',
  fieldType: 'radioButtonGroup',
  fieldLabel: 'Gender',
  validationRules: [{
    validationMethod: 'validatePresence',
    arguments: true
  }],
  options: [{
    'label': 'Male',
    'value': 'male'
  }, {
    'label': 'Female',
    'value': 'female'
  }, {
    'label': 'Other',
    'value': 'other'
  }],
};