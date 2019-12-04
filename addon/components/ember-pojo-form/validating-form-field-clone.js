import validatingFormField from './validating-form-field';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default validatingFormField.extend({
  layout,
  emberPojoForms: service(),

  cloneErrors: computed('changeset.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    return validationErrors[index];
  }),

  displayValidation: computed('changeset.error', 'clonedFormField.{focussed,wasValidated}', function() {
    var index = this.get('index');
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    var fieldValidationEvents = clonedFormField.get('validationEvents') || [];
    if (fieldValidationEvents.indexOf('keyUp') < 0 && clonedFormField.get('focussed')) {
      return;
    }
    if (this.get('masterfieldDisplayValidation') === 'valid') { return 'valid'; }
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    if (!validationErrors) { return; }
    if (!validationErrors[index]) { return; }
    if (validationErrors[index].length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),
});
