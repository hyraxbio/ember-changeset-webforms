import EmberObject from '@ember/object';

export default function parseChangesetWebformField(field) {
  // var defaultValidationEvents = ['focusOut'];
  if (!field) { return; }
  if (!field.fieldId) {
    throw Error(`[Ember validating field] fieldId is a required field for each field in a validating form.`);
  }
  // TODO this must go many levels deep and be it's own util.
  // var checkKeyExists = (object, searchKey) => {
  //   for (var key in object) {
  //     if (key === searchKey) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };


  // var required;
  if (field.validationRules) {
    var requiredRule = field.validationRules.find(function(rule) {
      return rule.validationMethod === 'validatePresence' && (rule.arguments === true || rule.arguments.presence === true);
    });
    if (requiredRule) {
      field.required = true;
    }
  }

  // Inherit form form if not set on field.
  // var hideSuccessValidation = false;
  // if (checkKeyExists(field, 'hideSuccessValidation')) {
  //   hideSuccessValidation = field.hideSuccessValidation;
  // } else if (formSchema) {
  //   if (formSchema.settings.hideSuccessValidation) {
  //     hideSuccessValidation = formSchema.settings.hideSuccessValidation;
  //   }
  // }

  // var hideLabel = false;
  // if (checkKeyExists(field, 'hideLabel')) {
  //   hideLabel = field.hideLabel;
  // } else if (formSchema) {
  //   if (formSchema.settings.hideLabels) {
  //     hideLabel = formSchema.settings.hideLabels;
  //   }
  // }

  // if (field.fieldType === 'checkboxGroup') {
  //   var options = field.options;
  //   options = options.map(function(option) {
  //     return EmberObject.create(option);
  //   });
  //   field.options = options;
  // }

  // if (field.fieldType === 'input' && !field.inputType) {
  //   field.inputType = 'text';
  // }

  if (field.clonable) {
    field.cloneGroupName = field.fieldId;
    field.cloneGroupNumber = 0;
    // field.minClones = field.minClones || 1;
  }

  // var validationRules = field.validationRules || [];
  field.validates = field.validationRules.length > 0 ? true : false;

  field.validationEvents = (field.validationEvents || []).map(item => {
    if (typeof item === 'string') {
      return {event: item};
    } else {
      return item;
    }
  });
  // var componentPath;
  // if (field.componentPath) {
  //   componentPath = field.componentPath;
  // } else if (fieldComponentsMap[field.fieldType]) {
  //   componentPath = fieldComponentsMap[field.fieldType].componentPath;
  // } else {
  //   componentPath = null;
  // }

  // var castOut;
  // if (field.castOut) {
  //   castOut = field.castOut;
  // } else if (fieldComponentsMap[field.fieldType]) {
  //   castOut = fieldComponentsMap[field.fieldType].castOut;
  // } else {
  //   castOut = null;
  // }

  // if (field.fieldLabelClassNames) {
  //   field.fieldLabelClassNames = field.fieldLabelClassNames.join(' ');
  // }
  // if (field.fieldClassNames) {
  //   field.fieldClasses = field.fieldClassNames.join(' ');
  // }

  // if (field.fieldErrorClassNames) {
  //   field.fieldErrorClasses = field.fieldErrorClassNames.join(' ');
  // }

  // if (field.fieldControlsClassNames) {
  //   field.fieldControlsClasses = field.fieldControlsClassNames.join(' ');
  // }
  
  // field.hideSuccessValidation = hideSuccessValidation;
  // field.hideLabel = hideLabel;
  // field.required = required;
  field.name = field.name || field.fieldId.replace(/\./g, '-');
  field.placeholder = field.placeholder || field.fieldLabel;
  field.component = field.componentPath;
  // field.castOut = castOut;
  // field.validates = validates;
  // field.validationEvents = parsedValidationEvents;
  field.propertyName = field.propertyName || field.fieldId;
  return EmberObject.create(field);
}
