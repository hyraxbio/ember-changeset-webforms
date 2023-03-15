import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(formFields, data, customValidators, opts = {}) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  formFields.forEach(formField => {
    formField.propertyName = formField.propertyName || formField.fieldId;
    // if (changeset.get(formField.propertyName)) { return; }
    if ((formField.defaultValue || formField.defaultValue === false) && !opts.suppressDefaults) {
      if (!data[formField.propertyName]) {
        data[formField.propertyName] = formField.defaultValue;
      }
    }
  });
  var changeset = new Changeset(data, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  // formFields.forEach(formField => {
  //   formField.propertyName = formField.propertyName || formField.fieldId;
  //   if (changeset.get(formField.propertyName)) { return; }
  //   if ((formField.defaultValue || formField.defaultValue === false) && !opts.suppressDefaults) {
  //     changeset.set(formField.propertyName, formField.defaultValue);
  //   } else {
  //     changeset.set(formField.propertyName, null);
  //   }
  // });
  return changeset;
}