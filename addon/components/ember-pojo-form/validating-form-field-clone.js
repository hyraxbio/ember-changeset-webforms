import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNames: ['ember-pojo-form-field-clone'],
  attributeBindings: ['dataTestClass:data-test-class'],
  dataTestClass: 'cloned-field',

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var index = this.get('index');
    var masterFormField = this.get('masterFormField');
    var clonedFormField = this.get('clonedFormField');
    var changeset = this.get('changeset');
    if (changeset.get(masterFormField.fieldId)[index]) {
      this.validateProperty(changeset, clonedFormField, 'insert');
    }
  },

  cloneErrors: computed('changeset.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    if (!validationErrors) { return; }
    return validationErrors[index];
  }),

  displayValidation: computed('changeset.error', 'clonedFormField.{focussed,wasValidated,fieldErrors,fieldErrors.@each}', function() {
    var index = this.get('index');
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    if (!this.validationEventObj(clonedFormField.validationEvents, 'keyUp') && clonedFormField.get('focussed')) {
      return;
    }   
    var masterFieldvalidationErrors = ((this.get(`changeset.error.${this.get('masterFormField.fieldId')}.validation`)) || []);
    var clonedFieldValidationErrors = masterFieldvalidationErrors[0];
    if (!this.get('clonedFormField.wasValidated')) { return; }
    if ((clonedFormField.fieldErrors || []).length > 0) {
      return 'invalid';
    }
    if (!masterFieldvalidationErrors) { return; }
    if (masterFieldvalidationErrors.length === 0) { return 'valid'; }
    if (!clonedFieldValidationErrors[index]) { return; }
    if (clonedFieldValidationErrors[index].length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  actions: {
    onFocusOutClone(index, clonedFormField, value) {
      this.onFocusOut(clonedFormField, this.updatedGroupValue(value, index));
    },

    onFocusInClone(index, clonedFormField) {
      this.onFocusIn(clonedFormField);
    },

    onKeyUpClone(index, clonedFormField, value, event) {
      this.onKeyUp(clonedFormField, this.updatedGroupValue(value, index), event);
      // Must always validate on keyUp because when changeset prop is updated, the validation errors for that prop are removed until validated again- this is dude to skipValidation.
      this.validateProperty(this.get('changeset'), clonedFormField);
    },

    onUserInteractionClone(index, clonedFormField, value) {
      this.onUserInteraction(clonedFormField, this.updatedGroupValue(value, index));
    }
  },

  updatedGroupValue(value, index) {
    var groupValue = this.get('groupValue') || [];
    groupValue[index] = value;
    return groupValue;
  },

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  }
});
