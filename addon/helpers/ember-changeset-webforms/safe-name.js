import { helper } from '@ember/component/helper';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default helper(function safeNameUtil(params) {
  return safeName(params[0]);
});
