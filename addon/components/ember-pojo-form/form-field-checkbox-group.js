import Component from '@ember/component';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';
import layout from '../../templates/components/ember-pojo-form/form-field-checkbox-group';

export default Component.extend({
  layout,
  classNames: ['checkbox-group'],

  didInsertElement: function() {
    var checkedItems = this.get('formField.value') || [];
    var options = this.get('formField.options');
    options.forEach(function(option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.set('value', true);
      } else {
        option.set('value', false);
      }
    })
  },

  actions: {
    checkboxToggled: function(key, value) {
      var checkedItems = this.get('formField.value') || [];
      if (value === true) {
        checkedItems.push(key);
      } else {
        checkedItems = checkedItems.filter(item => {
          return item != key;
        })
      }
      if (checkedItems.length === 0) {
        checkedItems = null;
      }
      this.onUserInteraction(checkedItems);
    }
  }
});