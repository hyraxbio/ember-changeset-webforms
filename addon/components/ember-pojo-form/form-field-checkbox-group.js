import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-checkbox-group';

export default Component.extend({
  layout,
  classNames: ['checkbox-group'],

  didInsertElement: function() {
    var defaults = this.get('formField.value');
    if (typeof defaults === 'string') {
     var defaultsArray = defaults.split(',');
     var trimmedDefaultsArray = defaultsArray.map(item => {
      return item.trim();
     });
     this.set('formField.value', trimmedDefaultsArray);
    }
    var checkedItems = this.get('formField.value') || [];
    var options = this.get('formField.options');
    options.forEach(function(option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.set('value', true);
      } else {
        option.set('value', false);
      }
    });
    this.send('checkLastRemaining', this.get('formField'), checkedItems);
  },

  actions: {
    checkboxToggled: function(key, value) {
      var checkedItems;
      var fieldValue = this.get('formField.value') || [];
      if (typeof fieldValue === 'string') {
        checkedItems = fieldValue.split(',');
      } else {
        checkedItems = fieldValue;
      }
      if (value === true) {
        checkedItems.push(key);
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
      this.send('checkLastRemaining', this.get('formField'), checkedItems);
      this.onUserInteraction(checkedItems);
    },

    checkLastRemaining(formField, checkedItems) {
      formField.get('options').setEach('lastRemaining', false);
      checkedItems = checkedItems || [];
      if (checkedItems.length === 1) {
        formField.get('options').findBy('key', checkedItems[0]).set('lastRemaining', true);
      } 
    }
  }
});