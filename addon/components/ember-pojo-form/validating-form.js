import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import validateFields from '../../utils/validate-fields';
import castAllowedFields from '../../utils/cast-allowed-fields';
import createChangeset from '../../utils/create-changeset';
import { assign } from '@ember/polyfills';
import isPromise from 'ember-changeset/utils/is-promise';
import EmberObject from '@ember/object';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-pojo-form'],

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
  },

  initial: computed('formSchema', 'settings', 'fields', function() {
    var formSchema;
    if (this.get('formSchema')) {
      formSchema = this.get('formSchema');
    } else if (this.get('settings')) {
      formSchema = {
        settings: this.get('settings'),
        fields: this.get('fields')
      };
    }
    var formObject = generateEmberValidatingFormFields(formSchema, this.get('fieldComponentsMap'));
    var initialChangeset = createChangeset(formObject.formFields, this.get('data'), this.get('customValidators'));
    return {
      formObject: formObject,
      changeset: initialChangeset
    };
  }),  

  formSettings: computed('formSchema', 'settings', function() {
    var formSettings;
    if (this.get('formSchema')) {
      formSettings = this.get('formSchema.settings');
    } else if (this.get('settings')) {
      formSettings = this.get('settings');
    }
    return assign(EmberObject.create(this.get('emberPojoForms.defaultSettings') || {}), EmberObject.create(this.get('emberPojoForms.settings') || {}), EmberObject.create(formSettings || {}));
  }),

  formObject: computed('initial.formObject', function() {
    return this.get('initial.formObject');
  }),

  changeset: computed('initial.changset', function() {
    return this.get('initial.changeset');
  }),

  formMetaData: computed('formObject', function() {
    return this.get('formObject.formMetaData');
  }),
  
  formFields: computed('formObject', 'formObject.formFields', 'formName', function() {
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
      validateFields(this.get('formFields'), changeset).then(validateResponse => {
        if (changeset.isValid) {
          if (this.get('beforeSubmitAction')) {
            this.beforeSubmitAction(changeset, this.get('formFields'));
          }
          castAllowedFields(this.get('formFields'), changeset);
          this.set("requestInFlight", true);
          if (this.get('submitAction')) {
              changeset.save().then(savedChangeset => {
                var submitAction = this.submitAction(savedChangeset.data, modelName, changeset, this.get('formFields'));
                if (isPromise(submitAction)) {
                  submitAction.then(submitActionResponse => {
                    this.set("requestInFlight", false);
                    if (this.get('saveSuccess')) {
                      this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formMetaData'), changeset);
                    }
                    if (this.get('formMetaData.resetAfterSubmit')) {
                      // this.send('resetForm'); //TODO does this need to be uncommented?
                    }
                  }).catch(error => {
                    this.set("requestInFlight", false);
                    if (this.get('saveFail')) {
                      this.saveFail(error, this.get('formFields'), this.get('formMetaData'), changeset);
                    }
                  });
                } else {
                  var submitActionResponse = submitAction;
                  if (this.get('saveSuccess')) {
                    this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formMetaData'), changeset);
                  }
                }
              });
          } else {
            changeset.save().then(saveChangesetResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(saveChangesetResponse, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              if (this.get('formMetaData.resetAfterSubmit')) {
                this.send('resetForm');
              }
            }).catch(error => {
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

    clearForm(changeset, formFields, modelName) {
      formFields.forEach(field => {
        changeset.set(field.propertyName, null);
      });
      this.send('submit', changeset, modelName)
      // if (this.beforeReset) { 
      //   this.beforeReset(); // TODO this must send the changeset
      // } 
      // var formObject = generateEmberValidatingFormFields(this.get('formSchema'), this.get('fieldComponentsMap'));
      // this.set('initial', {
      //   formObject: formObject,
      //   changeset: createChangeset(formObject.formFields, this.get('data'), this.get('customValidators'))
      // });
      // if (this.afterReset) { 
      //   this.afterReset(changeset, formFields); // TODO this must send the changeset
      // } 
    }
    
  }
});