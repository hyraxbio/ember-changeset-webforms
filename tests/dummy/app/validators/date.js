import buildMessage from 'ember-changeset-validations/utils/validation-errors';
import { validate } from 'ember-validators';

export default function validateDate(options = {} ) {
  return (key, newValue, oldValue, changes, content) => {
    let result = validate('date', newValue, options, null, key);
    return (result === true) ? true : buildMessage(key, result);
  };
}