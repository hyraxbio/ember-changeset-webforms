import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/checkbox-group';
import { tracked } from '@glimmer/tracking';

@templateLayout(layout)
@tagName('')
export default class CheckboxGroup extends Component {
  @tracked value;
  @tracked value;

  @computed('displayValue')
  get options() {
    var checkedItems = this.stringToArray(this.displayValue);
    var options = this.formField.options;
    options.forEach(function (option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.value = true;
      } else {
        option.value = false;
      }
    });
    options.forEach((option) => (option.onlyCheckedOption = false));
    checkedItems = checkedItems || [];
    if (checkedItems.length === 1) {
      const checkedOption = options.findBy('key', checkedItems[0]);
      checkedOption.onlyCheckedOption = true;
    }
    return options;
  }

  @action
  checkboxToggled(formField, key, value, event) {
    var checkedItems = this.stringToArray(this.displayValue);
    if (value === true) {
      checkedItems = checkedItems.concat([key]); // Use concat not push so that the computed property above can recognise when a new item is checked.
    } else {
      checkedItems = checkedItems.filter((item) => {
        return item != key;
      });
    }
    if (checkedItems.length === 0) {
      checkedItems = null;
    } else {
      checkedItems = checkedItems.sort();
    }
    this.onChange(formField, checkedItems);
    this.onUserInteraction(formField, 'checkboxToggled', checkedItems, event);
  }

  stringToArray(value) {
    var array;
    if (typeof value === 'string') {
      array = value.split(',');
    } else {
      array = this.displayValue || [];
    }
    array = array.map((item) => {
      return item.trim();
    });
    return array;
  }
}
