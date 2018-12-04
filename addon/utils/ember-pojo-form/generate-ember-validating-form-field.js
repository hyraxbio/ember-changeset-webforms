import EmberObject from '@ember/object';

export default function generateEmberValidatingFormField(field, index, formSchema, existing) {
  // if (!field) { return; }
  var fieldElementComponents = {
    "input":            "ember-pojo-form/form-field-input",
    "textarea":         "ember-pojo-form/form-field-textarea",
    "powerSelect":      "ember-pojo-form/form-field-power-select",
    "powerDatePicker":  "ember-pojo-form/form-field-power-datepicker",
    "singleCheckbox":   "ember-pojo-form/form-field-checkbox",
    "radioButtonGroup": "ember-pojo-form/form-field-radio-button-group",
    "checkboxGroup":    "ember-pojo-form/form-field-checkbox-group",
    "textSeparator":    "ember-pojo-form/form-field-text-separator",
    // "datePikaday":      "custom-elements/form-field-date-pikaday",
    // "date":             "custom-elements/form-field-date-bootstrap"
  };

  if (!field.fieldId) {
    throw Error(`[Ember validating field] fieldId is a required field for validating form. This is missing in item ${index}.`);
  }

  // if (field.fieldType === 'radioButtonGroup' && !field.name) {
  //   console.warn(`[Ember validating field] You have not provided a name attribute for the radioButtonsGroup with id ${field.fieldId}. This will prevent arrow navigation between options.`);
  // }

  // TODO this must go many levels deep and be it's own util.
  var checkKeyExists = (object, searchKey) => {
    for (var key in object) {
      if (key === searchKey) {
        return true;
      }
    }
    return false;
  };

  var fieldObject = EmberObject.create(field);

  if (field.fieldType === 'customComponent') {
    fieldObject.component = field.componentPath;
    return fieldObject;
  }

  var value;
  if (formSchema) {
    var fieldIdParts = field.fieldId.split('.');
    var thisPart = formSchema.recordToUpdate;
    fieldIdParts.forEach(function(part) {
      if (thisPart) {
        thisPart = thisPart[part];
      }
    });
    value = thisPart;
  }
  if (field.default && (value === undefined || value === null)) {
    value = field.trim ? field.default.trim() : field.default;
  }

  var required;
  if (field.validationRules) {
    var requiredRule = field.validationRules.find(function(rule) {
      return rule.validationMethod === 'required';
    });
    if (requiredRule) {
      required = true;
    }
  }

  // var name = field.name || field.fieldId.replace(/\./g, '-');

  // var placeholder;
  // if (checkKeyExists(field, 'name')) {
  //   name = field.name;
  // } else {
  //   if (field.fieldId) {
  //     name = field.fieldId.replace(/\./g, '-');
  //   }
  // }

  // Inherit form form if not set on field.
  var hideSuccessValidation = false;
  if (checkKeyExists(field, 'hideSuccessValidation')) {
    hideSuccessValidation = field.hideSuccessValidation;
  } else if (formSchema) {
    if (formSchema.hideSuccessValidation) {
      hideSuccessValidation = formSchema.hideSuccessValidation;
    }
  }

  var hideLabel = false;
  if (checkKeyExists(field, 'hideLabel')) {
    hideLabel = field.hideLabel;
  } else if (formSchema) {
    if (formSchema.hideLabels) {
      hideLabel = formSchema.hideLabels;
    }
  }

  if (field.fieldType === 'checkboxGroup') {
    var options = field.options;
    options = options.map(function(option) {
      return EmberObject.create(option);
    });
    fieldObject.set('options', options);
  }

  // fieldObject.set('error', null);
  fieldObject.set('value', value);
  fieldObject.set('hideSuccessValidation', hideSuccessValidation);
  fieldObject.set('hideLabel', hideLabel);
  fieldObject.set('required', required);
  fieldObject.set('name', field.name || field.fieldId.replace(/\./g, '-'));
  fieldObject.set('placeholder', field.placeholder || field.fieldLabel);
  fieldObject.set('component', fieldElementComponents[field.fieldType]);
  return fieldObject;
}
