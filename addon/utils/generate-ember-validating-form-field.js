import EmberObject from '@ember/object';

export default function generateEmberValidatingFormField(field, fieldComponentsMap, formSchema) {
  if (!field.fieldId) {
    throw Error(`[Ember validating field] fieldId is a required field for each field in a validating form.`);
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

  if (field.clonable) {
    fieldObject.set('cloneGroupName', field.fieldId);
    fieldObject.set('cloneGroupNumber', 0);
    fieldObject.set('lastClone', true);
    fieldObject.set('onlyClone', true);
  }

  var validationRules = field.validationRules || [];
  var validates = validationRules.length > 0 ? true : false;

  fieldObject.set('hideSuccessValidation', hideSuccessValidation);
  fieldObject.set('hideLabel', hideLabel);
  fieldObject.set('required', required);
  fieldObject.set('name', field.name || field.fieldId.replace(/\./g, '-'));
  fieldObject.set('placeholder', field.placeholder || field.fieldLabel);
  fieldObject.set('component', field.componentPath || fieldComponentsMap[field.fieldType].componentPath);
  fieldObject.set('castOut', field.castOut || fieldComponentsMap[field.fieldType].castOut);
  fieldObject.set('validates', validates);
  fieldObject.set('schema', field);
  
  return fieldObject;
}
