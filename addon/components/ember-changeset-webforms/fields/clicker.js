import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/clicker';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    onClick(formField, event) {
      this.onUserInteraction(formField, 'click', null, event)
    }
  }
});
