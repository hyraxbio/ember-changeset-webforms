import Component from '@glimmer/component';

export default class FieldLabel extends Component {
  get noLabel() {
    const formField = this.args.formField;
    if (formField.hideLabel) {
      return true;
    }
    if (
      !formField.fieldLabel &&
      !formField.labelComponent &&
      !formField.fieldLegend &&
      !formField.legendComponent
    ) {
      return true;
    }
    return null;
  }

  get includeForAtttribute() {
    const nonFormElementFieldTypes = ['staticContent'];
    return !nonFormElementFieldTypes.includes(this.args.formField.fieldType);
  }
}
