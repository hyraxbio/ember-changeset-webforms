import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';
import { assign } from '@ember/polyfills';
import objectFromPath from './object-from-path';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};

  var emptyObject = {};
  formFields.forEach(field => {
    if (field.defaultValue && !field.notrim && typeof field.defaultValue === 'string' && field.inputType !== 'password') {
      field.defaultValue = field.defaultValue.trim();
    }
    emptyObject = objectFromPath(emptyObject, field.fieldId, field.defaultValue);
  });
  data = assign(emptyObject, data);

  var validationsMap = createValidations(formFields, customValidators);
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  formFields.forEach(formField => {
    if (!changeset.get(formField.fieldId)) {
      changeset.set(formField.fieldId, formField.defaultValue);
    }
  });
  return changeset;
}