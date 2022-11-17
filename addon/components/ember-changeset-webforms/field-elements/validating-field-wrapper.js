import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field-wrapper';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: ['displayValidation', 'disabledClasses', 'readonly:readonly', 'formField.fieldNamesClasses', 'formField.hideSuccessValidation:hide-success-validation', 'validatesClasses', 'wasValidatedClasses', 'typeClass', 'focussedClasses', 'formField.fieldClassNames', 'requiredClasses'],

  requiredClasses: computed('formField.required', function() {
    return this.formField.required ? this.formField.requiredFieldClassNames.join(' ') : '';
  }),

  disabledClasses: computed('formField.disabled', function() {
    return this.formField.disabled ? this.formField.disabledFieldClassNames.join(' ') : '';
  }),

  validatesClasses: computed('formField.validates', function() {
    return this.formField.validates ? this.formField.fieldValidatesClassNames.join(' ') : '';
  }),

  wasValidatedClasses: computed('formField.wasValidated', function() {
    return this.formField.wasValidated ? this.formField.wasValidatedClassNames.join(' ') : '';
  }),

  focussedClasses: computed('formField.focussed', function() {
    return this.formField.focussed ? this.formField.focussedClassNames.join(' ') : '';
  }),

  'data-test-cwf-field-validates': computed('formField.validates', function() {
    return this.get('formField.validates');
  }),

  'data-test-cwf-field-required': computed('formField.required', function() {
    return this.get('formField.required');
  }),

  'data-test-id': computed('dataTestFieldId', function() {
    if (!this.get('dataTestFieldId')) { return; }
    return `${this.get('dataTestFieldId')}-field`;
  }),

});
