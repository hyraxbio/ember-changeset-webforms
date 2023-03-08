import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/field-label';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  noLabel: computed('formField.{hideLabel,labelComponent,fieldLabel}', function() {
    const formField = this.formField;
    if (formField.hideLabel) { return true; }
    if (!formField.fieldLabel && !formField.labelComponent) { return true; }
    return;
  }),
});
