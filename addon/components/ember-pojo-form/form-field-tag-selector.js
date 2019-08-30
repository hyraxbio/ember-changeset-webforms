import Component from '@ember/component';
import $ from 'jquery';
import layout from '../../templates/components/ember-pojo-form/form-field-tag-selector';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    var labelElement = this.$('label[for]');
    var forAttr = labelElement.attr('for');
    $(labelElement).click(function() {
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
    onchange(value) {
      value = value || [];
      if (value.length === 0) {
        value = null;
      }
      this.onUserInteraction(value);
    },

    onkeydown(dropdown, e) {
      if (e.keyCode === 13) {
        var value = this.get('displayValue') || [];
        var newItem;
        if (this.get('formField.optionDisplayProp')) {
          newItem = {};
          newItem[this.get('formField.optionDisplayProp')] = e.target.value;
        } else {
          newItem = e.target.value;
        }
        this.onUserInteraction(value.concat(newItem));
      }
    }
  }
});