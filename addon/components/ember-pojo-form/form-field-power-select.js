import Component from '@ember/component';
import $ from 'jquery';
import layout from '../../templates/components/ember-pojo-form/form-field-power-select';

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
});