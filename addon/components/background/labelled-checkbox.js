import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-checkbox';

export default Component.extend({
  layout,
  tagName: "div",
  classNames: ["labelled-checkbox"],
  classNameBindings: ["disabled:disabled"],
  attributeBindings: ['dataTestId:data-test-id'],
  
  actions: {
    checkboxClicked: function(value) {
      if (this.changedAction) {
        this.changedAction(value);
      }
    }
  }
});