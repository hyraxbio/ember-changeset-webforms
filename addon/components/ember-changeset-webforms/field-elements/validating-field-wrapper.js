import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';

@tagName('')
@templateLayout(layout)
export default class ValidatingFieldWrapper extends Component {
  @computed('dataTestFieldId')
  get dataTestId() {
    if (!this.dataTestFieldId) {
      return;
    }
    return `${this.dataTestFieldId}-field`;
  }

  @computed('typeClass')
  get dataTestClass() {
    if (!this.typeClass) {
      return;
    }
    return `cwf-${this.typeClass}`;
  }
}
