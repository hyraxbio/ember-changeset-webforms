import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/field-label';

@templateLayout(layout)
@tagName('')
export default class FieldLabel extends Component {
  get noLabel() {
    const formField = this.formField;
    if (formField.hideLabel) {
      return true;
    }
    if (!formField.fieldLabel && !formField.labelComponent) {
      return true;
    }
    return;
  }
}
