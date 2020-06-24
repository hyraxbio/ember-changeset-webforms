import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  // console.log(data);
  data.date = {};
  data.date.start = data.date_from;
  formFields.forEach(formField => {
    // console.log(formField);
    formField.propertyName = formField.propertyName || formField.fieldId;
    if (!changeset.get(formField.propertyName) && formField.defaultValue) {
      changeset.set(formField.propertyName, formField.defaultValue);
    }
    // if (formField.subIds) {

    // }
  });
  return changeset;
}