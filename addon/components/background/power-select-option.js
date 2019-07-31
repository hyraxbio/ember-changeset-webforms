import Component from '@ember/component';
import layout from '../../templates/components/background/power-select-option';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  optionName: computed('optionKeyPath', 'option', function() {
    var option = this.get('option');
    var optionKeyPath = this.get('optionKeyPath');
    if (typeof option === 'string') {
      return option;
    } else {
      if (!optionKeyPath) {
        throw(`Ember fire forms: you passed an array of objects as your options for the field with ID ${this.get('fieldId')}, but you did not specify the option key path, which which tells the field which key to display as the option name.`);
      }
      if (!(optionKeyPath in option)) {
        throw(`Ember fire forms: you passed ${optionKeyPath} as the optionKeyPath for the field with ID ${this.get('fieldId')}, but the key ${optionKeyPath} was not found in the object that was passed as the option for this field.`);
      }
      return option[optionKeyPath];
    }
  })
});
