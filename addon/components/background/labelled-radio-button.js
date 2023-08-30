import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-radio-button';
import safeName from 'ember-changeset-webforms/utils/safe-name';

@templateLayout(layout)
@tagName('')
export default class LabelledRadioButton extends Component {
  get radioId() {
    if (this.formField.fieldId === this.option.value) {
      return safeName(this.formField.id);
    }
    return safeName(`${this.formField.id}-${this.option.value}`);
  }
}
