import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/radio-button-group';

@templateLayout(layout)
@tagName('')
export default class RadioButtonGroup extends Component {
  @reads('displayValue')
  groupValue;

  @action
  onRadioChange(value) {
    this.onUserInteraction(this.formField, 'radioOptionChanged', value);
    this.onChange(this.formField, value);
  }
}
