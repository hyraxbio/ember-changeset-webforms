import { helper } from '@ember/component/helper';
import getWithDefaultUtil from 'ember-changeset-webforms/utils/get-with-default';

export function getWithDefault(params) {
  return getWithDefaultUtil(params);
}

export default helper(getWithDefault);
