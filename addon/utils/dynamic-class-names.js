import { camelize } from '@ember/string';

export default function dynamicClassNames(elementTypesString, changesetWebform, formField) {
  let classNames = [];
  if (!changesetWebform) {
    return;
  }

  const elementTypes = formField ? elementTypesString.split(',').reduce((acc, elementType) => {
    return acc.concat([elementType, camelize(`${elementType} ${formField.fieldType}`)])
  }, []) : elementTypesString.split(',');

  elementTypes.forEach(elementType => {
    const classNameSettings = changesetWebform.formSchemaWithDefaults.classNameSettings;
      if (formField && (classNameSettings[elementType] || []).indexOf('...validationClassNames') > -1) {
        if (formField.validationStatus === 'valid') {
        classNames = classNames.concat(classNameSettings.validClassNames || []);
      } else if (formField.validationStatus === 'invalid') {
        classNames = classNames.concat(classNameSettings.invalidClassNames || []);
      } 
    }
    classNames = classNames.concat(classNameSettings[elementType] || []);
  });
  return classNames.filter(className => !className.startsWith('.')).join(' ');
}
