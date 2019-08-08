import Component from '@ember/component';
import $ from 'jquery';
import layout from '../../templates/components/ember-pojo-form/form-field-tag-selector';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    var labelElement = this.$('label[for]');
    var forAttr = labelElement.attr('for');
    $(labelElement).click(function(e) {
      self.$(`#${forAttr}`).focus();
    });
  },

  allowClear: computed('formField.allowClear', function() {
    if (this.get('formField.allowClear') === false) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    onkeydown(dropdown, e) {
      if (e.keyCode === 13) {
        var value = this.get('formField.value') || [];
        var newItem;
        if (this.get('formField.optionKeyPath')) {
          newItem = {};
          newItem[this.get('formField.optionKeyPath')] = e.target.value;
        } else {
          newItem = e.target.value;
        }
        this.onUserInteraction(value.concat(newItem));
      }
    }
  }
});