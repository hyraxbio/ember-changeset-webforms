import Component from '@ember/component';
import layout from '../../templates/components/background/power-select-option';

export default Component.extend({
  layout,
  tagName: '',

  // optionName: computed('optionDisplayProp', 'optionName', function() {
  //   var optionName = this.get('optionName');
  //   var optionDisplayProp = this.get('optionDisplayProp');
  //   if (typeof option !== 'string') {
  //     return option;
  //   } else {
  //     if (typeof option !== 'string' && !optionDisplayProp) {
  //       throw(`Ember fire forms: you passed an array of objects as your options for the field with ID ${this.get('fieldId')}, but you did not specify the option key path, which which tells the field which key to display as the option name.`);
  //     }
  //     if (!option.get(optionDisplayProp)) {
  //       throw(`Ember fire forms: you passed ${optionDisplayProp} as the optionDisplayProp for the field with ID ${this.get('fieldId')}, but the key ${optionDisplayProp} was not found in the object that was passed as the option for this field.`);
  //     }
  //     return option.get(optionDisplayProp);
  //   }
  // })
});
