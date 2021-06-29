import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['ember-changeset-webforms-field'],
  classNameBindings: ['displayValidation', 'formField.required:required', 'disabled:disabled', 'readonly:readonly', 'formField.fieldClasses', 'formField.hideSuccessValidation:hide-success-validation', 'formField.validates:validates', 'typeClass', 'formField.focussed:focussed'],

  'data-test-ember-changeset-webforms-field-validates': computed('formField.validates', function() {
    return this.get('formField.validates');
  }),

  'data-test-ember-changeset-webforms-field-required': computed('formField.required', function() {
    return this.get('formField.required');
  }),

  'data-test-id': computed('dataTestFieldId', function() {
    if (!this.get('dataTestFieldId')) { return; }
    return `${this.get('dataTestFieldId')}-field`;
  }),

});
