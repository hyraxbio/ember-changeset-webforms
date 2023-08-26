import { helper } from '@ember/component/helper';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default helper(function dynamicClasses(params) {
  return safeName(params[0]);
});
