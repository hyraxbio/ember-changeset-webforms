import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/checkbox';

@templateLayout(layout)
@tagName('')
export default class Checkbox extends Component {
  @action
  checkboxToggled(formField, value, event) {
    this.onChange(formField, value);
    this.onUserInteraction(formField, 'checkboxToggled', value, event);
  }
}
