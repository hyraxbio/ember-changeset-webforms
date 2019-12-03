import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';
import layout from '../../templates/components/ember-pojo-form/validating-form-field';
import createChangeset from '../../utils/create-changeset';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default Component.extend({
  layout,
  tagName: '',
  emberPojoForms: service(),

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
  },

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var formField = this.get('formField');
    if (!this.get('changeset')) {
      this.set('changeset', createChangeset([this.get('formField')], this.get('data'), this.get('customValidators')));
    }

    var validateOnInsert;
    if (formField.validationEvents) {
      if (formField.validationEvents.indexOf('insert') > -1) {
        validateOnInsert = true;
      }
    }
    if (validateOnInsert && (formField.defaultValue)) {
      this.send('validateProperty', this.get('changeset'), this.get('formField.fieldId'));
    }
  },

  parsedDataTestId: computed('dataTestId', function() {
    return this.get('dataTestId') || this.get('formField.dataTestId') || `validating-field-${this.get('formField.fieldId')}`;
  }),

  typeClass: computed('formField.fieldType', function() {
    var myStr = this.get('formField.fieldType');
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  displayValidation: computed('changeset.error', 'formField.{focussed,wasValidated}', function() {
    var formField = this.get('formField');
    if (!formField) { return; }
    var fieldValidationEvents = formField.get('validationEvents') || [];
    if (fieldValidationEvents.indexOf('keyUp') < 0 && formField.get('focussed')) {
      return;
    }

    var validationErrors = (this.get(`changeset.error.${this.get('formField.fieldId')}.validation`)) || [];
    if (validationErrors.length === 0) {
      if (!this.get('formField.wasValidated')) { return; }
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  formField: computed('fieldSchema', 'processedFieldSchema', 'prop', function() {
    if (this.get('processedFieldSchema')) {
      return this.get('processedFieldSchema');
    } else {
      return generateEmberValidatingFormField(this.get('fieldSchema'), this.get('fieldComponentsMap'));
    }
  }),

  validates: computed('fieldSchema', function() {
    return (this.get('fieldSchema.validationRules') || []).length > 0;
  }),

  actions: {
    validateProperty(changeset, property) {
      var formField = this.get('formField');
      // if (!formField.validates) { return; }
      changeset.validate(property);
      this.set('formField.wasValidated', true);
      if (this.get('afterValidation')) {
        this.afterValidation(formField, changeset);
      }
    },

    onUserInteraction: function(value) {
      this.send('setFieldValue', value);
    },

    onFocusOut: function(value) {
      this.send('validateProperty', this.get('changeset'), this.get('formField.fieldId'));
      var formField = this.get('formField');
      formField.set('focussed', false);
      if (value && !formField.get('notrim') && formField.get('inputType') !== 'password') {
        value = value.trim();
      }
      this.send('setFieldValue', value);
      if (this.focusOutAction) {
        this.focusOutAction(formField);
      }
    },

    onFocusIn: function() {
      var formField = this.get('formField');
      formField.set('focussed', true);
      if (this.focusInAction) {
        this.focusInAction(formField);
      }
    },

    onKeyUp: function(value) {
      this.send('setFieldValue', value);
      var formField = this.get('formField');
      if (formField.get('validationKeyCodes')) {
        if (formField.get('validationKeyCodes').indexOf(event.keyCode) > -1) {
          this.send('validateProperty', this.get('changeset'), this.get('formField.fieldId'));
        }
      }
      if (this.afterKeyUpAction) {
        this.afterKeyUpAction(value, event, formField, this.get('changeset'));
      }
    },

    setFieldValue: function(value, eventType) {
      var changeset = this.get('changeset');
      var prop = this.get('formField.fieldId');
      changeset.set(prop, value);
      this.send('validateProperty', changeset, prop, eventType);
      if (this.customTransforms) {
        this.customTransforms(prop, changeset);
      }
    }
  }
});
