import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-checkbox';
import { computed } from '@ember/object';
import safeName from 'ember-changeset-webforms/utils/safe-name';
// import getClassNamesUtil from 'ember-changeset-webforms/utils/get-class-names';

export default Component.extend({
  layout,
  tagName: '',
  // classNames: ["labelled-checkbox"],
  // classNameBindings: ['disabled:disabled', 'elementClassNames'],

  // elementClassNames: computed('changesetWebform', function() {
  //   return getClassNamesUtil(this.changesetWebform, 'labelledCheckbox');
  // }),

  checkboxId: computed('name', 'option.key', 'containerName', function() {
    if (this.name === this.option.key) {
      return safeName(`${this.containerName} ${this.name}`);
    }
    return safeName(`${this.containerName} ${this.name}-${this.option.key}`)
  }),
  
  actions: {
    checkboxClicked: function(event) {
      if (this.changedAction) {
        this.changedAction(event.target.checked, event);
      }
    }
  }
});