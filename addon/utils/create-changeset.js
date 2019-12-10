import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  formFields.forEach(formField => {
    if (!changeset.get(formField.propertyName) && formField.defaultValue) {
      changeset.set(formField.propertyName, formField.defaultValue);
    }
  });
  return changeset;
}