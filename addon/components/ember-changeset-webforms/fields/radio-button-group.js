import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/radio-button-group';
import { tracked } from '@glimmer/tracking';
@templateLayout(layout)
@tagName('')
export default class RadioButtonGroup extends Component {
  @tracked displayValue;
  groupValue;
  get groupValue() {
    return this.displayValue;
  }

  @action
  onRadioChange(value) {
    this.onUserInteraction(this.formField, 'radioOptionChanged', value);
    this.onChange(this.formField, value);
  }
}
