import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-input';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    // Note do this so that you can get the event object. Ember's built in keyUp helper does not allow for this.
    this.element.addEventListener('keyup', (e) => this.send('handleKeyUp', e));
  },

  actions: {
    handleKeyUp(e) {
      this.onKeyUp(this.get('formField'), e.target.value, e);
    },

    focusIn() {
      this.onFocusIn(this.get('formField'));
    },

    focusOut(value) {
      this.onFocusOut(this.get('formField'), value);
    }
  }
});