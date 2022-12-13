import { camelize } from '@ember/string';
import _mergeWith from 'lodash/mergeWith';
import mergeWithDefaultClassNames from 'ember-changeset-webforms/utils/merge-with-default-class-names';

export default function dynamicClassNames(elementTypesString, changesetWebform, formField) {
  
  let classNames = [];
  if (!changesetWebform) {
    return;
  }

  const elementTypes = formField ? elementTypesString.split(',').reduce((acc, elementType) => {
    return acc.concat([elementType, camelize(`${elementType} ${formField.fieldType}`)])
  }, []) : elementTypesString.split(',');

  elementTypes.forEach(elementType => {
    let classNameSettings = changesetWebform.formSchemaWithDefaults.classNameSettings;

    if (formField && (formField.classNames || {})[elementType]) {
      const objToMerge = {};
      objToMerge[elementType] = formField.classNames[elementType] || [];
      classNameSettings = _mergeWith({}, classNameSettings, objToMerge, mergeWithDefaultClassNames);
    }
    let classNamesArray;
    if (typeof classNameSettings[elementType] === 'function') {
      classNamesArray = classNameSettings[elementType](classNameSettings, changesetWebform, formField) || [];
    } else {
      classNamesArray = classNameSettings[elementType] || [];
    }
    if (formField && (classNamesArray).indexOf('$validationClassNames') > -1) {
      if (formField.validationStatus === 'valid') {
        classNames = classNames.concat(classNameSettings.validClassNames || []);
      } else if (formField.validationStatus === 'invalid') {
        classNames = classNames.concat(classNameSettings.invalidClassNames || []);
      } 
    }
    classNames = classNames.concat(classNamesArray);
  });
  return classNames.filter(className => !className.startsWith('$')).join(' ');
}
