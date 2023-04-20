import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/checkbox-group';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  options: computed('displayValue', function() {
    var checkedItems = this.stringToArray(this.displayValue);
    var options = this.get('formField.options');
    options.forEach(function(option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.set('value', true);
      } else {
        option.set('value', false);
      }
    });
    options.setEach('onlyCheckedOption', false);
    checkedItems = checkedItems || [];
    if (checkedItems.length === 1) {
      options.findBy('key', checkedItems[0]).set('onlyCheckedOption', true);
    }
    return options;
  }),

  actions: {
    checkboxToggled: function(formField, key, value, event) {
      var checkedItems = this.stringToArray(this.displayValue);
      if (value === true) {
        checkedItems = checkedItems.concat([key]); // Use concat not push so that the computed property above can recognide whne a new item is checked.
      } else {
        checkedItems = checkedItems.filter(item => {
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
    },
  },

  stringToArray(value) {
    var array;
    if (typeof value === 'string') {
      array = value.split(',');
    } else {
      array = this.displayValue || [];
    }
    array = array.map(item => {
      return item.trim();
    });
    return array;
  }
});