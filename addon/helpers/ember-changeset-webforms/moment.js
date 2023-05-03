import { helper } from '@ember/component/helper';

export default helper(function momentFormat(positional) {
  return moment(positional[0], positional[1]);
});
