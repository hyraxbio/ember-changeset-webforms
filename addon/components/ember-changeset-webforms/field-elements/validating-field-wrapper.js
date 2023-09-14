import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ValidatingFieldWrapper extends Component {
  @tracked dataTestFieldId;
  @tracked typeClass;

  get dataTestId() {
    if (!this.args.dataTestFieldId) {
      return;
    }
    return `${this.args.dataTestFieldId}-field`;
  }

  get dataTestClass() {
    if (!this.args.typeClass) {
      return;
    }
    return `cwf-${this.args.typeClass}`;
  }
}
