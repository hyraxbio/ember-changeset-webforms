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
    const formFieldClassNames = (formField || {}).classNames || {};
    // TODO formFieldClassNames filtered to only merge in the classNames for the element type and not bother if that is not set.

    const classNameSettings = _mergeWith({}, changesetWebform.formSchemaWithDefaults.classNameSettings, formFieldClassNames, mergeWithDefaultClassNames);
    if (elementType === 'clickerElement') {
      console.log('---------------------')
      console.log(changesetWebform.formSchemaWithDefaults.classNameSettings)
      console.log(classNameSettings)
    }


    const classNamesArray = classNameSettings[elementType] || [];
    if (formField && (classNamesArray).indexOf('...validationClassNames') > -1) {
      if (formField.validationStatus === 'valid') {
        classNames = classNames.concat(classNameSettings.validClassNames || []);
      } else if (formField.validationStatus === 'invalid') {
        classNames = classNames.concat(classNameSettings.invalidClassNames || []);
      } 
    }
    classNames = classNames.concat(classNamesArray);
  });
  
  return classNames.filter(className => !className.startsWith('.')).join(' ');
}
