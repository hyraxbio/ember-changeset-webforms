import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/tag-selector';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    // var labelElement = jQuery('label[for]');
    // var forAttr = labelElement.attr('for');
    // jQuery(labelElement).click(function() {
    //   jQuery(`#${forAttr}`).focus();
    // });
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
      this.onChange(formField, value, 'optionSelected');
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
        this.onChange(value.concat(newItem));
      }
    }
  }
});