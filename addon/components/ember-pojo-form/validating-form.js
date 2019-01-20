import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/ember-pojo-form/generate-ember-validating-form-fields';
import generateFormValues from '../../utils/generate-form-values';
import validateField from '../../utils/ember-pojo-form/validate-field';
import layout from '../../templates/components/ember-pojo-form/validating-form';

export default Component.extend({
  layout,
  classNameBindings: ['class', 'validationFailed:validation-failed'],

  formObject: computed('formSchema', 'processedFormSchema', function() {
    if (this.get('processedFormSchema')) {
      return this.get('processedFormSchema');
    } else {
      return generateEmberValidatingFormFields(this.get('formSchema'));
    }
  }),

  formName: computed('formObject', function() {
    var formName = this.get('formObject.formMetaData.formName');
    if (!formName) {
      throw Error(`Your form schema must have a formName property.`);
    }
    if (!validator.isAlphanumeric(formName)) {
      throw Error(`The formName property in your form schema may only contain alphanumeric characters.`);
    }
    return formName;
  }),

  formMetaData: computed('formObject', 'formName', function() {
    var storedformObject = this.get(`storageService.${this.get('formName')}`);
    if (storedformObject) {
      return storedformObject.formMetaData;
    } else {
      return this.get('formObject.formMetaData');
    }
  }),

  formFields: computed('formObject', 'formName', function() {
    var storedformObject = this.get(`storageService.${this.get('formName')}`);
    if (storedformObject) {
      return storedformObject.formFields;
    } else {
      return this.get('formObject.formFields');
    }
  }),

  submitButtonText: computed('formMetaData', function() {
    return this.get('formMetaData.submitButtonText') ? this.get('formMetaData.submitButtonText') : "Submit";
  }),

  resetButtonText: computed('formMetaData', function() {
    return this.get('formMetaData.resetButtonText') ? this.get('formMetaData.resetButtonText') : "Reset";
  }),

  validationFailed: computed('formMetaData.formStatus', function() {
    return this.get('formMetaData.formStatus') === 'validationFailed';
  }),

  willDestroyElement: function() {
    var formMetaTitle = this.get('formMetaData.formName');
    var storageService = this.get("storageService");
    if (!storageService) {return;}
    var form = this.get("formObject");
    storageService.set(formMetaTitle, form);
  },

  actions: {
    customValidations: function(formField) {
      if (this.customValidations) {
        this.customValidations(formField, this.get('formFields'));
      }
    },

    setFormFieldValue: function(formField, value) {
      if (formField.get('value')) {
        formField.set('previousValue', formField.get('value'));
      }
      value = value || '';
      formField.set('value', value);
      if (this.customTransforms) {
        this.customTransforms(this.get('formFields'), formField.get('fieldId'), this.get('formMetaData'));
      }
    },

    setFormFieldError: function(formField, error) {
      formField.set('error', error);
    },

    setFormFieldProperty: function(formField, prop, value) {
      formField.set(prop, value);
    },

    submit: function() {
      this.send('validateAllFields');
      if (this.formValidates()) {
        if (this.formValidationPassed) {
          this.formValidationPassed();
        }
        var formFields = this.get('formFields');
        var formMetaData = this.get('formMetaData');
        var values = generateFormValues(formFields);

        if (formMetaData.submitAsync === false) {
          this.send('submitSync', values, formFields, formMetaData);
        } else {
          this.send('submitAsync', values, formFields, formMetaData);
        }
      } else {
        this.set('formMetaData.formStatus', 'validationFailed');
        this.set('formMetaData.submitButtonFeedback', 'Some fields have errors which must be fixed before continuing.');
        if (this.formValidationFailed) {
          this.formValidationFailed(this.get('formFields'), this.get('formMetaData'));
        }
      }
    },

    validateAllFields: function() {
      var formFields = this.get('formFields');
      formFields.forEach(formField => {
        if (!formField.get('validationRules')) { return; }
        formField.set('error', validateField(formField));
        if (formField.get('error')) {
          return;
        }
        var customValidationRule = formField.get('validationRules').find(rule => {
          return rule.validationMethod === 'custom';
        })
        if (this.customValidations && customValidationRule) {
          this.customValidations(formField, this.get('formFields'));
        }
      });
    },

    resetForm() {
      this.set('formObject', generateEmberValidatingFormFields(this.get('formSchema'), 'reset'));
      if (this.afterReset) {
        var formFields = this.get('formFields');
        var formMetaData = this.get('formMetaData');
        var values = this.generateFormValues(formFields);
        this.afterReset(values, formFields, formMetaData);
      }
    },

    submitSync(values, formFields, formMetaData) {
      this.submitAction(values, formFields, formMetaData);
      if (formMetaData.resetAfterSubmit === true) {
        this.send('resetForm');
      }
    },

    submitAsync(values, formFields, formMetaData) {
      this.set("requestInFlight", true);
      if (this.get('formMetaData.recordToUpdate')) {
        var record = this.get('formMetaData.recordToUpdate');
        formFields.forEach(function(formField) {
          if (formField.fieldId && formField.fieldType !== 'staticContent') {
            // if (record.get(formField.fieldId)) { TODO replace with search for key in object.
              record.set(formField.fieldId, formField.value);
            // }
          }
        });
        this.submitAction(record).then((response) => {
          this.saveSuccess(response, formFields, formMetaData);
          this.set("requestInFlight", false);
          if (formMetaData.resetAfterSubmit === true) {
            this.resetForm();
          }
        }).catch(error => {
          this.set("requestInFlight", false);
          //TODO test that this actually works.
          record.rollbackAttributes();
          this.saveFail(error, formFields);
        });
      } else {
        this.submitAction(values, formMetaData.modelName).then((response) => {
          this.saveSuccess(response, formFields, formMetaData);
          this.set("requestInFlight", false);
          if (formMetaData.resetAfterSubmit === true) {
            this.send('resetForm');
          }
        }).catch(error => {
          this.set("requestInFlight", false);
          this.saveFail(error, formFields);
        });
      }
    }
  },

  formValidates: function() {
    var validationFields = this.get('formFields').filter(field => {
      field.set('validationRules', field.get('validationRules') || []);
      return field.validationRules.length > 0;
    });
    var allPassed = validationFields.every(field => {
      var fieldRequired = field.validationRules.find(rule => {
        return rule.validationMethod === 'required';
      })
      return field.get('error') === false || (!fieldRequired && !field.value) || field.get('hidden');
    });
    if (allPassed) {
      return true;
    }
    return false;
  },

  generateValidationErrorMessage: function(validationRule) {
    // Todo remove
    var readablevalidationRule = validationRule.substring(2).replace(/([A-Z])/g, function(match) {
       return "" + match;
    });
    if (readablevalidationRule !== readablevalidationRule.toUpperCase()) {
      readablevalidationRule = readablevalidationRule.toLowerCase();
    }
    return readablevalidationRule;
  },
});