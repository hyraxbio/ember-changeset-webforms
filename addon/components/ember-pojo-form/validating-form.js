import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/ember-pojo-form/generate-ember-validating-form-fields';
import generateFormValues from '../../utils/generate-form-values';
import validateField from '../../utils/ember-pojo-form/validate-field';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import validators from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['class', 'validationFailed:validation-failed'],

  validators,
  init() {
    this._super(...arguments);
    var UserValidations = {
      name: this.get('validators').validatePresence(true),
    };
    this.changeset = new Changeset(this.get('model'), lookupValidator(UserValidations), UserValidations);
  },

  processedFormSchema: computed('formSchema', 'settings', 'fields', function() {
    var formSchema;
    if (this.get('formSchema')) {
      formSchema = this.get('formSchema');
    } else if (this.get('settings')) {
      formSchema = {
        settings: this.get('settings'),
        fields: this.get('fields')
      };
    }
    return generateEmberValidatingFormFields(formSchema);
  }),  

  formObject: computed('processedFormSchema', 'props', 'propsHash', function() {
    // var UserValidations = {
    //   name: this.get('validators').validatePresence(true),
    // };
    // let changeset = new Changeset(this.get('model'), UserValidations);
    // // console.log(changeset);
    // this.set('changeset', changeset);
    var formObject = this.get('processedFormSchema');
    formObject.formFields.forEach(field => {
      if (this.get(`props.${field.fieldId}`)) {
        field.set('value', this.get(`props.${field.fieldId}`));
      }
    });
    return formObject;
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

  validationFailed: computed('formMetaData.validationStatus', function() {
    return this.get('formMetaData.validationStatus') === 'failed';
  }),

  validationPassed: computed('formMetaData.validationStatus', function() {
    return this.get('formMetaData.validationStatus') === 'passed';
  }),

  needsValidation: computed('formFields', 'formFields.@each', function() {
    var formFields = this.get('formFields') || [];
    return formFields.find(field => {
      field.set('validationRules', field.validationRules || []);
      return field.validationRules.length > 0;
    });
  }),

  formValidationClass: computed('needsValidation', 'formMetaData.validationStatus', function() {
    if (!this.get('needsValidation')) {
      return;
    }
    if (!this.get('formMetaData.validationStatus')) {
      return 'needs-validation';
    }
    return 'was-validated';
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

    customTransforms(fieldId) {
       if (this.customTransforms) {
        this.customTransforms(this.get('formFields'), fieldId, this.get('formMetaData'));
      }
    },

    setFormFieldValue: function(formField, value) {
      if (formField.get('value')) {
        formField.set('previousValue', formField.get('value'));
      }
      value = value || '';
      formField.set('value', value);
      // if (this.customTransforms) {
      //   this.customTransforms(this.get('formFields'), formField.get('fieldId'), this.get('formMetaData'));
      // }
    },

    setFormFieldError: function(formField, error) {
      formField.set('error', error);
    },

    setFormFieldProperty: function(formField, prop, value) {
      formField.set(prop, value);
    },

    submit: function() {
      this.send('validateAllFields');
      var formMetaData = this.get('formMetaData');
      if (this.formValidates()) {
        if (this.formValidationPassed) {
          this.formValidationPassed();
          formMetaData.set('validationStatus', 'passed');
        }
        var formFields = this.get('formFields');
        
        var values = generateFormValues(formFields);

        if (formMetaData.submitAsync === false) {
          this.send('submitSync', values, formFields, formMetaData);
        } else {
          this.send('submitAsync', values, formFields, formMetaData);
        }
      } else {
        formMetaData.set('validationStatus', 'failed');
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
        });
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
        var values = generateFormValues(formFields);
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
            var property = formField.fieldId;
            if (property.split('.').length > 1) {
              var levels = property.split('.');
              levels.forEach((_, index) => {
                var thisLevelProp = levels.slice(0, index + 1).join('.');
                if (!record.get(thisLevelProp)) {
                  record.set(thisLevelProp, {});
                }
              });
            }
            // if (record.get(formField.fieldId)) { TODO replace with search for key in object.
              record.set(formField.fieldId, formField.value);
            // }
          }
        });
        this.submitAction(record).then((response) => {
          this.set("requestInFlight", false);
          if (formMetaData.resetAfterSubmit === true) {
            this.send('resetForm');
          }
          this.saveSuccess(response, formFields, formMetaData);
        }).catch(error => {
          this.set("requestInFlight", false);
          //TODO test that this actually works.
          record.rollbackAttributes();
          if (this.get('saveFail')) {
            this.saveFail(error, formFields);
          }
          
        });
      } else {
        this.submitAction(values, formMetaData.modelName).then((response) => {
          this.set("requestInFlight", false);
          if (formMetaData.resetAfterSubmit === true) {
            this.send('resetForm');
          }
          this.saveSuccess(response, formFields, formMetaData);
        }).catch(error => {
          this.set("requestInFlight", false);
          if (this.get('saveFail')) {
            this.saveFail(error, formFields);
          }
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