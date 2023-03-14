import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/static-content';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  textElement: computed('formField.{text,textElement}', function() {
    return htmlSafe(`<${this.formField.textElement} class="${this.formField.textElementClass}">${this.formField.text}</${this.formField.textElement}>`)
  }),
});