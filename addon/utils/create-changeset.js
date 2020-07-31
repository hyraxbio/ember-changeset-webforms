import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  formFields.forEach(formField => {
    formField.propertyName = formField.propertyName || formField.fieldId;
    if (changeset.get(formField.propertyName)) { return; }
    changeset.set(formField.propertyName, formField.defaultValue || null);
  });
  return changeset;
}