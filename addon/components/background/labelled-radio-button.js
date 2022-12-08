import Component from '@ember/component';
import layout from '../../templates/components/background/labelled-radio-button';
import { computed } from '@ember/object';
import safeName from 'ember-changeset-webforms/utils/safe-name';
// import getClassNamesUtil from 'ember-changeset-webforms/utils/get-class-names';

export default Component.extend({
  layout,
  tagName: '',

  radioId: computed('name', 'option.value', 'containerName', function() {
    if (this.name === this.option.value) {
      return safeName(`${this.containerName} ${this.name}`);
    }
    return safeName(`${this.containerName} ${this.name}-${this.option.value}`)
  }),
});