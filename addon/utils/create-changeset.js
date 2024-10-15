import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations';

export default function createChangeset(
  formFields,
  data,
  customValidators,
  opts = {},
) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = Changeset(
    data,
    lookupValidator(validationsMap),
    validationsMap,
    { skipValidate: true },
  );

  formFields.forEach((formField) => {
    formField.propertyName = formField.propertyName || formField.fieldId;
    if (changeset.get(formField.propertyName) !== undefined) {
      return;
    }
    if (
      Object.prototype.hasOwnProperty.call(formField, 'defaultValue') &&
      !opts.suppressDefaults
    ) {
      changeset.set(formField.propertyName, formField.defaultValue);
    }
  });
  return changeset;
}
