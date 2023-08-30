import { tracked } from '@glimmer/tracking';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';

@tagName('')
@templateLayout(layout)
export default class ValidatingFieldWrapper extends Component {
  @tracked dataTestFieldId;
  @tracked typeClass;

  get dataTestId() {
    if (!this.dataTestFieldId) {
      return;
    }
    return `${this.dataTestFieldId}-field`;
  }

  get dataTestClass() {
    if (!this.typeClass) {
      return;
    }
    return `cwf-${this.typeClass}`;
  }
}
