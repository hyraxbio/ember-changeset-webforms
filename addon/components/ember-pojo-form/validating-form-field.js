import Component from '@ember/component';
import { computed } from '@ember/object';
import { once } from '@ember/runloop';
import generateEmberValidatingFormField from '../../utils/ember-pojo-form/generate-ember-validating-form-field';
import layout from '../../templates/components/ember-pojo-form/validating-form-field';

export default Component.extend({
  layout,
  classNames: ["ember-pojo-form-field"],
  classNameBindings: ["displayValidation", "formField.required:required", "disabled:disabled", "readonly:readonly", "formField.fieldClass", 'hideSuccessValidation:hide-success-validation', 'validates:validates', 'typeClass', 'formField.hidden:hidden'],
  attributeBindings: ["data-test-id", "data-test-validation-field"],
 
  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    once(this, function() {
      var formField = this.get('formField');
      var changeset = this.get('changeset');
      var prop = formField.fieldId;
      var value = changeset.get(prop);
      this.send('setDisplayValue');
      if (formField.get("autoFocus") && !value) {
        this.$("input").focus();
      }
      var validateOnInsert;
      if (formField.validationEvents) {
        if (formField.validationEvents.indexOf('insert') > -1) {
          validateOnInsert = true;
        }
      }
      if (validateOnInsert && (formField.defaultValue)) {
        this.send('validateField');
      }
    });
  },

  typeClass: computed('formField.fieldType', function() {
    var myStr = this.get('formField.fieldType');
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  displayValidation: computed('changeset.error', 'formField.focussed', function() {
    var formField = this.get('formField');
    if (!this.get('wasValidated')) { return; }
    var fieldValidationEvents = formField.get('validationEvents') || [];
    if (fieldValidationEvents.indexOf('keyUp') < 0 && formField.get('focussed')) {
      return;
    }
    var validationErrors = (this.get(`changeset.error.${this.get('formField.fieldId')}.validation`)) || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),

  formField: computed('fieldSchema', 'processedFieldSchema', 'prop', function() {
    if (this.get('processedFieldSchema')) {
      return this.get('processedFieldSchema');
    } else {
      return generateEmberValidatingFormField(this.get('fieldSchema'));
    }
  }),

  validates: computed('formField.validationRules', function() {
    if (this.get('formField.validationRules')) {
      return true;
    }
    return false;
  }),

  actions: {
    validateProperty(changeset, property){
      this.set('wasValidated', true);
      // console.log(changeset);
      // console.log(property);
      return changeset.validate(property);
    },

    onUserInteraction: function(value) {
      this.send('setFieldValue', value);
    },

    setFieldProperty(prop, value) {
      var formField = this.get('formField');
      if (this.setFormFieldProperty) {
        this.setFormFieldProperty(formField, prop, value);
      } else {
        formField.set(prop, value);
      }
    },

    onFocusOut: function(value) {
      this.send('validateProperty', this.get('changeset'), this.get('formField.fieldId'));
      var formField = this.get('formField');
      formField.set('focussed', false);
      if (value && !formField.get("notrim") && formField.get('inputType') !== 'password') {
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

    onKeyUp: function(value, event) {
      this.send('setFieldValue', value);
      var formField = this.get('formField');
      if (formField.get('validationKeyCodes')) {
        if (formField.get('validationKeyCodes').indexOf(event.keyCode) > -1) {
          this.send('validateField');
        }
      }
      if (this.afterKeyUpAction) {
        this.afterKeyUpAction(value, event, formField);
      }
    },

    validateField: function() {
      // // Todo error must be updated by sending updateForm action if it is supplied.
      // var formField = this.get('formField');
      // var validationRules = formField.get('validationRules') || [];
      // this.send('setFieldError', null); // To ensure the error message updates, if the field has been updated but now fails a different validation rule to the previous validation attempt.
      // var error = validateField(formField);
      // this.send('setFieldError', error);
      // if (!this.customValidations && this.afterValidation) {
      //   this.afterValidation(formField);
      // }
      // if (error) { return; }
      // // TODO throw error if custom is passed as a validation rule, but the 'customValidations' action is not passed in. Do this on didInsert.
      // var customRule = validationRules.find(function(rule) {
      //   return rule.validationMethod === 'custom';
      // });
      // if (this.customValidations && customRule) {
      //   this.customValidations(formField, this.get('formFields'));
      //   if (this.afterValidation) {
      //     this.afterValidation(formField);
      //   }
      // }
    },

    setFieldValue: function(value) {
      var changeset = this.get('changeset');
      var prop = this.get('formField.fieldId');
      changeset.set(prop, value);
      this.send('setDisplayValue');
      this.send('validateProperty', changeset, prop);
      if (this.customTransforms) {
        this.customTransforms(this.get('formField'));
      }
      // var formField = this.get('formField');
      // if (this.setFormFieldValue) { // Field is part of a form.
      //   this.setFormFieldValue(formField, value);
      //   // this.send('sendValidateOnValueUpdate');
      //   this.customTransforms(formField.get('fieldId'));
      // } else { // Field is used on its own.
      //   if (formField.get('value')) {
      //     formField.set('previousValue', formField.get('value'));
      //   }
      //   value = value || '';
      //   formField.set('value', value);
      //   // this.send('sendValidateOnValueUpdate');
      //   if (this.customTransforms) {
      //     this.customTransforms(formField);
      //   }
      // }
    },

    setDisplayValue() {
      var changeset = this.get('changeset');
      var prop = this.get('formField.fieldId');
      this.set('displayValue', null);
      console.log('run');
      console.log(changeset.get(prop));
      this.set('displayValue', changeset.get(prop));
    },

    setFieldError: function(error) {
      var formField = this.get('formField');
      if (this.setFormFieldError) {
        this.setFormFieldError(formField, error);
      } else {
        formField.set('error', error);
      }
    },

    sendValidateOnValueUpdate() {
      var formField = this.get('formField');
      formField.validationEvents = formField.validationEvents || [];
      // If a field validates on keyUp, don't show a validation error if the backspace all chars in the field.
      if (formField.validationEvents.indexOf('keyUp') > -1 && formField.focussed && formField.value === '') {
        formField.set("error", null);
        return;
      }
      if (!formField.focussed || formField.validationEvents.indexOf('keyUp') > -1) {
        this.send('validateField');
      }
    },
  }
});
