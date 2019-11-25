import EmberObject from '@ember/object';

export default function generateEmberValidatingFormField(field, index, formSchema, mode) {
  var fieldElementComponents = {
    input:            {
      componentPath: 'ember-pojo-form/form-field-input'
    },
    textarea:         {
      componentPath: 'ember-pojo-form/form-field-textarea'
    },
    powerSelect:      {
      componentPath: 'ember-pojo-form/form-field-power-select'
    },
    powerDatePicker:  {
      componentPath: 'ember-pojo-form/form-field-power-datepicker'
    },
    singleCheckbox:   {
      componentPath: 'ember-pojo-form/form-field-checkbox'
    },
    radioButtonGroup: {
      componentPath: 'ember-pojo-form/form-field-radio-button-group'
    },
    checkboxGroup:    {
      componentPath: 'ember-pojo-form/form-field-checkbox-group',
    },
    dateRange:        {
      componentPath: 'ember-pojo-form/form-field-date-range'
    },
    tagSelector:      {
      componentPath: 'ember-pojo-form/form-field-tag-selector'
    },
    button:           {
      componentPath: 'ember-pojo-form/form-field-button',
      castOut: true
    },
    staticContent:    {
      componentPath: 'ember-pojo-form/form-field-static-content',
      castOut: true
    }
  };

  if (!field.fieldId) {
    throw Error(`[Ember validating field] fieldId is a required field for validating form. This is missing in item ${index}.`);
  }

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

  // if (field.fieldType === 'customComponent') {
  //   fieldObject.component = field.componentPath;
  //   return fieldObject;
  // }

  var required;
  if (field.validationRules) {
    var requiredRule = field.validationRules.find(function(rule) {
      return rule.validationMethod === 'validatePresence' && rule.arguments === true;
    });
    if (requiredRule) {
      required = true;
    }
  }

  // Inherit form form if not set on field.
  var hideSuccessValidation = false;
  if (checkKeyExists(field, 'hideSuccessValidation')) {
    hideSuccessValidation = field.hideSuccessValidation;
  } else if (formSchema) {
    if (formSchema.settings.hideSuccessValidation) {
      hideSuccessValidation = formSchema.settings.hideSuccessValidation;
    }
  }

  var hideLabel = false;
  if (checkKeyExists(field, 'hideLabel')) {
    hideLabel = field.hideLabel;
  } else if (formSchema) {
    if (formSchema.settings.hideLabels) {
      hideLabel = formSchema.settings.hideLabels;
    }
  }

  if (field.fieldType === 'checkboxGroup') {
    var options = field.options;
    options = options.map(function(option) {
      return EmberObject.create(option);
    });
    fieldObject.set('options', options);
  }

  if (field.fieldType === 'input' && !field.inputType) {
    fieldObject.set('inputType', 'text');
  }

  var validationRules = field.validationRules || [];
  var validates = validationRules.length > 0 ? true : false;

  fieldObject.set('hideSuccessValidation', hideSuccessValidation);
  fieldObject.set('hideLabel', hideLabel);
  fieldObject.set('required', required);
  fieldObject.set('name', field.name || field.fieldId.replace(/\./g, '-'));
  fieldObject.set('placeholder', field.placeholder || field.fieldLabel);
  fieldObject.set('component', field.componentPath || fieldElementComponents[field.fieldType].componentPath);
  fieldObject.set('castOut', field.castOut || fieldElementComponents[field.fieldType].castOut);
  fieldObject.set('validates', validates);
  return fieldObject;
}
