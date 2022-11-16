import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/input';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    // Note do this so that you can get the event object. Ember's built in keyUp helper does not allow for this.
    this.element.addEventListener('keyup', (e) => this.send('handleKeyUp', e));
  },

  actions: {
    handleKeyUp(event) {
      this.onUserInteraction(this.formField, event.target.value, 'keyUp', event);
      // this.onKeyUp(this.get('formField'), e.target.value, e);
    },

    focusIn() {
      this.onFocusIn(this.get('formField'));
    },

    change(value) {
      this.onChange(this.get('formField'), value);
    },

    focusOut(value) {
      this.onFocusOut(this.get('formField'), value);
    }
  }
});