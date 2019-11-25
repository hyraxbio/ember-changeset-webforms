import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  formFields.forEach(formField => {
    if (formField.defaultValue && !changeset.get(formField.fieldId)) {
      changeset.set(formField.fieldId, formField.defaultValue);
    }
  });
  return changeset;
}