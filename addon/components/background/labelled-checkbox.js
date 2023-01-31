import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-checkbox';
import { computed } from '@ember/object';
import safeName from 'ember-changeset-webforms/utils/safe-name';

export default Component.extend({
  layout,
  tagName: '',

  checkboxId: computed('formField', 'option.key', function() {
    if (this.formField.fieldId === this.option.key) {
      return safeName(this.formField.id);
    }
    return safeName(`${this.formField.id}-${this.option.key}`)
  }),
  
  actions: {
    checkboxClicked: function(event) {
      if (this.changedAction) {
        this.changedAction(event.target.checked, event);
      }
    }
  }
});