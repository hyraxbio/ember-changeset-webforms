import Component from '@ember/component';
import { computed } from '@ember/object';
// import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import layout from '../../../templates/components/ember-changeset-webforms/field-elements/validating-field';

export default Component.extend({
  layout,
  tagName: '',

  dataTestFieldId: computed(
    'dataTestId',
    'dataTestFormName',
    'formField.dataTestFieldName',
    function () {
      if (this.dataTestId) {
        return this.dataTestId;
      }
      return [
        this.dataTestFormName,
        this.formField.dataTestFieldName || this.formField.fieldId,
      ]
        .filter((item) => item)
        .join('-');
    }
  ),

  typeClass: computed('formField.fieldType', function () {
    var myStr = this.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }),

  labelId: computed('formField.name', function () {
    return `${this.formField.name}-label`;
  }),

  ariaLabelledBy: computed('labelId', function () {
    if (!this.formField.hideLabel) {
      return this.labelId;
    }
    return;
  }),

  ariaLabel: computed('formField.{hideLabel,fieldLabel}', function () {
    return this.formField.hideLabel ? this.formField.fieldLabel : null;
  }),

  isGroup: computed('formField.options', function () {
    return this.formField.options ? true : null;
  }),

  actions: {
    didInsert() {
      //Code below will maintain validation colours when component is re-rendered.
      var formField = this.formField;
      const changeset = this.changesetWebform.changeset;
      if (changeset.get(formField.propertyName)) {
        formField.eventLog.pushObject('insert');
        this.send('validateField', formField);
      }
    },

    validateField(formField) {
      formField.validate().then((fieldValidationErrors) => {
        this.afterFieldValidation(
          formField,
          formField.changeset,
          fieldValidationErrors
        );
      });
    },

    onChange(formField, value) {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      formField.eventLog.pushObject('change');
      this.send('setFieldValue', value, formField);
    },

    onUserInteraction(formField, eventType, value, event) {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      formField.eventLog.pushObject(eventType);
      if (eventType === 'keyUp') {
        if (formField.fieldType === 'input' && event.keyCode === 13) {
          if (this.submitForm) {
            formField.set('focussed', false);
            this.submitForm(this.changesetWebform.changeset);
          }
          return;
        }
        this.send('setFieldValue', value, formField);
      } else if (eventType === 'focusOut') {
        formField.set('focussed', false);
        formField.eventLog.pushObject('focusOut');
        if (
          value &&
          formField.trim &&
          formField.inputType !== 'password' &&
          typeof value === 'string'
        ) {
          value = value.trim();
        }
        this.send('setFieldValue', value, formField);
      } else if (eventType === 'focusIn') {
        formField.set('focussed', true);
      }
      this.onUserInteraction(formField, eventType, value, event);
    },

    // onUserInteractionClone(...args) {
    //   this.onUserInteraction([args]);
    // },

    setFieldValue: function (value, formField) {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      var changeset = this.changesetWebform.changeset;
      formField.set('previousValue', changeset.get(formField.propertyName));
      changeset.set(formField.propertyName, value);
      if (this.onFieldValueChange) {
        this.onFieldValueChange(formField, changeset);
      }
      this.send('validateField', formField);
    },
  },
});
