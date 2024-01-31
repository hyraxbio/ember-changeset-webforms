import EmberObject from '@ember/object';
import FormField from 'ember-changeset-webforms/utils/form-field';
import { typeOf as emberTypeOf } from '@ember/utils';
import Option from 'ember-changeset-webforms/utils/option-class';

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
    field.clonedFieldBlueprint.validationEvents.forEach((item) => {
      const skip = ['submit', 'removeClone'];
      if (skip.indexOf(item.event) > -1) {
        return;
      }
      const newObj = { ...item };
      newObj.event = `${item.event}Clone`;
      if (!field.validationEvents.find((item) => item.event === newObj.event)) {
        field.validationEvents.pushObject(newObj);
      }
    });
  }
  field.validates = field.validationRules.length > 0 ? true : false;

  field.validationEvents = (field.validationEvents || [])
    .concat(field.alwaysValidateOn || [])
    .map((item) => {
      if (typeof item === 'string') {
        return { event: item };
      } else {
        return item;
      }
    });

  field.name =
    field.name ||
    `${formSettings.formName}-${field.fieldId.replace(/\./g, '-')}`;
  field.id = `${formSettings.formName}-${field.fieldId.replace(/\./g, '-')}`;
  field.placeholder = field.placeholder || field.fieldLabel;
  field.propertyName = field.propertyName || field.fieldId;
  delete field.alwaysValidateOn;
  delete field.cloneFieldSchema;
  return field;
}
