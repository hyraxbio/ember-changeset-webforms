import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import createChangesetData from '../../utils/create-changeset';
import createValidations from '../../utils/create-validations';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-pojo-form'],
 
  changeset: computed('formSchema', function() {
    var data = this.get('data');
    var changesetData;
    if (data) {
      changesetData = data;
    } else {
      changesetData = createChangesetData(this.get('formSchema.fields'));
    }
    var validationsMap = createValidations(this.get('formSchema.fields'), this.get('customValidators'));
    var changeset = new Changeset(changesetData, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
    return changeset;
  }),

  formObject: computed('formSchema', 'settings', 'fields', function() {
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

  formValidationClass: computed('changeset.{isInvalid,isValid}', function() {
    if (this.get('changeset.isInvalid')) {
      return 'validation-failed';
    }
    if (this.get('changeset.isValid')) {
      return 'validation-passed';
    }
    return;
  }),

  willDestroyElement: function() {
    var formMetaTitle = this.get('formMetaData.formName');
    var storageService = this.get("storageService");
    if (!storageService) {return;}
    var form = this.get("formObject");
    storageService.set(formMetaTitle, form);
  },

  actions: {
    customTransforms(fieldId, changeset) {
       if (this.get('customTransforms')) {
        this.customTransforms(this.get('formFields'), fieldId, this.get('formMetaData'), changeset);
      }
    },

    submit(changeset, modelName) {
      var allowedFields = this.get('formFields').filter(field => {
        return !field.hidden && field.fieldType;
      }).map(allowedField => {
        return allowedField.fieldId;
      });
      var validatePromises = allowedFields.map(allowedField => {
        return changeset.validate(allowedField);
      });
      Promise.all(validatePromises).then(validateResponse => {
        if (changeset.isValid) {
          changeset.cast(allowedFields);
          this.set("requestInFlight", true);
          if (this.get('submitAction')) {
            // TODO this must first save the changeset.
            this.submitAction(changeset.data, modelName, changeset).then(submitActionResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              if (this.get('formMetaData.resetAfterSubmit')) {
                changeset.rollback();
              }
            }).catch(error => {
              this.set("requestInFlight", false);
              if (this.get('saveFail')) {
                this.saveFail(error, this.get('formFields'), this.get('formMetaData'), changeset);
              }
            });
          } else {
            changeset.save().then(saveChangesetResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(saveChangesetResponse, this.get('formFields'), this.get('formMetaData'), changeset);
              }
            }).catch(error => {
              changeset.rollback();
              if (this.get('saveFail')) {
                this.saveFail(error, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              this.set("requestInFlight", false);
            });
          }
        } else {
          if (this.get('formValidationFailed')) {
            this.formValidationFailed(validateResponse, changeset);
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },

    rollback(changeset) {
      changeset.rollback();
      var formFields = this.get('formFields');
      formFields.setEach('wasValidated', null);
      if (this.afterReset) { 
        // var formFields = this.get('formFields');
        // var formMetaData = this.get('formMetaData');
        // var values = generateFormValues(formFields);
        // this.afterReset(values, formFields, formMetaData); // TODO this must send the changeset
      } 
    },
  }
});