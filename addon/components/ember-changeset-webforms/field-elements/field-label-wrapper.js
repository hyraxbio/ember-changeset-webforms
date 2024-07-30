import Component from '@glimmer/component';

export default class FieldLabel extends Component {
  get labelType() {
    const formField = this.args.formField;
    const nonFormElementFieldTypes = ['staticContent', 'powerSelect'];
    if (nonFormElementFieldTypes.includes(formField.fieldType)) {
      return 'div';
    }
    if (this.args.formField.isFieldset) {
      return 'legend';
    }
    return 'label';
  }
}
