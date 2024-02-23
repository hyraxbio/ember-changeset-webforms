import Component from '@glimmer/component';

export default class ValidatingFieldWrapper extends Component {
  get dataTestId() {
    if (!this.args.dataTestFieldId) {
      return null;
    }

    return `${this.args.dataTestFieldId}`;
  }

  get dataTestClass() {
    if (!this.args.typeClass) {
      return null;
    }
    return `cwf-${this.args.typeClass}`;
  }
}
