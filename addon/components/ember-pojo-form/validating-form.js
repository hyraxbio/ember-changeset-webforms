import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import createChangeset from '../../utils/create-changeset';
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

  // init() {
  //   this._super(...arguments);
  //   if (!this.get('changeset')) {
  //     var props = this.get('props');
  //     console.log(props);
  //     var changesetObj;
  //     if (props) {
  //       changesetObj = props; // TODO This must still add any paths from fieldIds that are not in the props obj
  //     } else {
  //       changesetObj = createChangeset(this.get('formSchema.fields'));
  //     }
  //     var validationsMap = createValidations(this.get('formSchema.fields'), this.get('customValidators'));
  //     this.changeset = new Changeset(changesetObj, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
  //   }
  // },

  changeset: computed('props', function() {
    var props = this.get('props');
    console.log(props);
    var changesetObj;
    if (props) {
      changesetObj = props; // TODO This must still add any paths from fieldIds that are not in the props obj
    } else {
      changesetObj = createChangeset(this.get('formSchema.fields'));
    }
    var validationsMap = createValidations(this.get('formSchema.fields'), this.get('customValidators'));
    return new Changeset(changesetObj, lookupValidator(validationsMap), validationsMap, { skipValidate: true });
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
       if (this.customTransforms) {
        this.customTransforms(this.get('formFields'), fieldId, this.get('formMetaData'), changeset);
      }
    },

    submit(changeset) {
      changeset.validate().then(validateResponse => {
        if (changeset.isValid) {
          this.set("requestInFlight", true);
          changeset.save().then(saveChangesetResponse => {
            if (this.get('formValidationPassed')) {
              this.formValidationPassed(changeset);
            }
            if (!changeset.data.save) {
              // Login
              if (this.get('submitAction')) {
                this.submitAction(changeset.data, 'authorisation', changeset).then(submitActionResponse => {
                  // Login success
                  this.set("requestInFlight", false);
                  if (this.get('saveSuccess')) {
                    this.saveSuccess(submitActionResponse);
                  }
                }).catch(error => {
                  // Login failed (incorrect creds)
                  this.set("requestInFlight", false);
                  if (this.get('saveFailed')) {
                    this.saveFailed(error);
                  }
                });
              }
            } else {
              // Edit account
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(saveChangesetResponse);
              }
            }
          }).catch(error => {
            console.log('Edit account failed - 400');
            changeset.rollback();
            if (this.get('saveFailed')) {
              this.saveFailed(error);
            }
            this.set("requestInFlight", false);
          });
        } else {
          if (this.get('formValidationFailed')) {
            this.formValidationFailed(validateResponse, changeset);
          }
        }
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
  }
});