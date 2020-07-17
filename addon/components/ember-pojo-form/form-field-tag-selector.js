import Component from '@ember/component';
import jQuery from 'jquery';
import layout from '../../templates/components/ember-pojo-form/form-field-tag-selector';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    var self = this;
    var labelElement = this.jQuery('label[for]');
    var forAttr = labelElement.attr('for');
    jQuery(labelElement).click(function() {
      self.jQuery(`#${forAttr}`).focus();
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
    onchange(formField, value) {
      value = value || [];
      if (value.length === 0) {
        value = null;
      }
      this.onUserInteraction(formField, value);
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