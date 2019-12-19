import { helper } from '@ember/component/helper';

export function arrayJoin(params/*, hash*/) {
  if (!params[0]) { return; }
  if (!Array.isArray(params[0])) { 
    console.warn(`[ember-fire-forms/array-join] You must pass an array as the first argument, You passed ${params[0]}] `);
    return params[0]; 
  }
  return params[0].join(params[1]);
}

export default helper(arrayJoin);
