import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-checkbox';
import { computed } from '@ember/object';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default Component.extend({
  layout,
  tagName: "div",
  classNames: ["labelled-checkbox"],
  classNameBindings: ["disabled:disabled"],

  checkboxId: computed('name', 'option.key', 'containerName', function() {
    if (this.name === this.option.key) {
      return safeName(`${this.containerName} ${this.name}`);
    }
    return safeName(`${this.containerName} ${this.name}-${this.option.key}`)
  }),
  
  actions: {
    checkboxClicked: function(value) {
      if (this.changedAction) {
        this.changedAction(value);
      }
    }
  }
});