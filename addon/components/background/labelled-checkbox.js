import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-checkbox';
import safeName from 'ember-changeset-webforms/utils/safe-name';

@templateLayout(layout)
@tagName('')
export default class LabelledCheckbox extends Component {
  get checkboxId() {
    if (this.formField.fieldId === this.option.key) {
      return safeName(this.formField.id);
    }
    return safeName(`${this.formField.id}-${this.option.key}`);
  }

  @action
  checkboxClicked(event) {
    if (this.changedAction) {
      this.changedAction(event.target.checked, event);
    }
  }
}
