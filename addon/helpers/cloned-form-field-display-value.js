import { helper } from '@ember/component/helper';

export function clonedFormFieldDisplayValue(params/*, hash*/) {
  var groupValue = params[0];
  var index = params[1];
  if (!groupValue) { return; }
  return groupValue[index];
}

export default helper(clonedFormFieldDisplayValue);
