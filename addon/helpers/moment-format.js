import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function momentFormat(positional) {
  return moment(positional[0]).format(positional[1]);
});
