import Component from '@glimmer/component';

export default class FieldLabel extends Component {
  get noLabel() {
    const formField = this.args.formField;
    if (formField.hideLabel) {
      return true;
    }
    if (!formField.fieldLabel && !formField.labelComponent) {
      return true;
    }
    return null;
  }
}
