import FormField from 'ember-changeset-webforms/utils/form-field';
import { typeOf as emberTypeOf } from '@ember/utils';
import Option from 'ember-changeset-webforms/utils/option-class';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default function parseChangesetWebformField(
  field,
  customValidators,
  formSettings,
) {
  if (!field) {
    return;
  }
  if (!field.fieldId) {
    throw Error(
      `[Ember validating field] fieldId is a required field for each field in a validating form.`,
    );
  }
  const parsedField = parse(field, customValidators, formSettings);
  return new FormField(parsedField);
}

function parse(fieldSchema, customValidators, formSettings) {
  const field = { ...fieldSchema };
  if (field.validationRules) {
    var requiredRule = field.validationRules.find(function (rule) {
      return (
        rule.validationMethod === 'validatePresence' &&
        (rule.arguments === true || rule.arguments.presence === true)
      );
    });
    if (requiredRule) {
      field.required = true;
    }
  }

  if (field.cloneFieldSchema) {
    field.cloneGroupName = field.fieldId;
    field.cloneGroupNumber = 0;
    field.cloneFieldSchema.fieldId = field.fieldId;
    field.clonedFieldBlueprint = parse(
      field.cloneFieldSchema,
      customValidators,
      formSettings,
    );
  }

  if (field.options) {
    field.options = field.options.map(function (option) {
      if (emberTypeOf(option) === 'object') {
        return new Option(option);
      }
      return option;
    });
  }

  if ((field.cloneFieldSchema || {}).validationRules) {
    field.validationRules = field.validationRules || [];
    field.validationRules.unshift({
      validationMethod: 'validateClone',
      arguments: {
        validationRules: field.cloneFieldSchema.validationRules,
        customValidators: customValidators,
      },
    });
    field.clonedFieldBlueprint.validatesOn.forEach((event) => {
      const skip = ['submit', 'removeClone'];
      if (skip.indexOf(event) > -1) {
        return;
      }
      if (
        !field.validatesOn.find((fieldEvent) => fieldEvent === `${event}Clone`)
      ) {
        field.validatesOn.pushObject(`${event}Clone`);
      }
    });
  }
  field.validates = field.validationRules.length > 0 ? true : false;
  // TODO get rid of fieldId
  field.validatesOn = (field.validatesOn || []).concat(
    field.alwaysValidateOn || [],
  );
  field.name =
    field.name ||
    safeName(`${formSettings.formName}-form-${field.fieldId}-field`);
  field.id =
    field.id ||
    safeName(`${formSettings.formName}-form-${field.fieldId}-field`);
  field.placeholder = field.placeholder || field.fieldLabel;
  field.propertyName = field.propertyName || field.fieldId;
  delete field.alwaysValidateOn;
  delete field.cloneFieldSchema;
  return field;
}
