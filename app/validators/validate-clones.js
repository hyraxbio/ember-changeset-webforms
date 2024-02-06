import defaultValidators from 'ember-changeset-validations/validators';
// TODO custom validators must be added here and integrated

export default function validateClones(options = {}) {
  return (key, newValue /*oldValue, changes, content*/) => {
    var allCloneValidations = [];
    newValue = newValue || [];
    newValue.forEach((item) => {
      var thisCloneValidations = [];
      options.cloneValidations.forEach((cloneValidation) => {
        var func = defaultValidators[cloneValidation.validationMethod](
          cloneValidation.arguments,
        );
        var validationResult = func(key, item);
        if (validationResult !== true) {
          thisCloneValidations.push(validationResult);
        }
      });
      if (
        thisCloneValidations.every((item) => {
          return item === true;
        })
      ) {
        thisCloneValidations = [];
      }
      allCloneValidations.push(thisCloneValidations);
    });
    if (
      allCloneValidations.every((item) => {
        return item.length === 0;
      })
    ) {
      return true;
    }
    return allCloneValidations;
  };
}
