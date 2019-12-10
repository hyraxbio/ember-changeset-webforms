import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-checkbox-group';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['checkbox-group'],

  options: computed('displayValue', function() {
    var checkedItems = this.stringToArray(this.get('displayValue'));
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
    checkboxToggled: function(key, value) {
      var checkedItems = this.stringToArray(this.get('displayValue'));
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
      this.onUserInteraction(this.get('formField'), checkedItems);
    },
  },

  stringToArray(value) {
    var array;
    if (typeof value === 'string') {
      array = value.split(',');
    } else {
      array = this.get('displayValue') || [];
    }
    array = array.map(item => {
      return item.trim();
    });
    return array;
  }
});