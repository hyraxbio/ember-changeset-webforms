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

  didInsertElement() {
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
    this.send('generateChangeset', this.get('formSchema'), this.get('data'));
    this.send('generateFormObject', this.get('formSchema'), this.get('fieldComponentsMap'));
  },  

  formSettings: computed('formSchema', function() {
    return assign(EmberObject.create(this.get('emberPojoForms.defaultSettings') || {}), EmberObject.create(this.get('emberPojoForms.settings') || {}), EmberObject.create(this.get('formSchema.settings') || {}));
  }),
  
  formFields: computed('formObject', function() {
    return this.get('formObject.formFields');
  }),

  validationFailed: computed('formSettings.validationStatus', function() {
    return this.get('formSettings.validationStatus') === 'failed';
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

  actions: {
    generateChangeset(formSchema, data) {
      this.set('changesetProp', createChangeset(formSchema.fields, data, this.get('customValidators')));
      if (this.get('afterGenerateChangeset')) {
        this.afterGenerateChangeset(this.get('changesetProp'));
      } 
    },

    generateFormObject(formSchema, fieldComponentsMap) {
      this.set('formObject', generateEmberValidatingFormFields(formSchema, fieldComponentsMap));
    },

    afterFieldEdit(fieldId, changeset, formField, snapshot) {
       if (this.get('afterFieldEdit')) {
        this.afterFieldEdit(this.get('formFields'), fieldId, this.get('formSettings'), changeset, snapshot);
      }
    },

    afterFieldValidation(validationResponse, formField, changeset) {
      if (this.afterFieldValidation) {
       this.afterFieldValidation(validationResponse, formField, changeset, this.get('formFields'), this.get('formSettings'));
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
                      this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formSettings'), changeset);
                    }
                    if (this.get('formSettings.resetAfterSubmit')) {
                      this.send('clearForm');
                    }
                  }).catch(error => {
                    this.set("requestInFlight", false);
                    if (this.get('saveFail')) {
                      this.saveFail(error, this.get('formFields'), this.get('formSettings'), changeset);
                    }
                  });
                } else {
                  this.set("requestInFlight", false);
                  var submitActionResponse = submitAction;
                  if (this.get('saveSuccess')) {
                    this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formSettings'), changeset);
                  }
                }
              });
          } else {
            changeset.save().then(saveChangesetResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(saveChangesetResponse, this.get('formFields'), this.get('formSettings'), changeset);
              }
              if (this.get('formSettings.resetAfterSubmit')) {
                this.send('resetForm');
              }
            }).catch(error => {
              if (this.get('saveFail')) {
                this.saveFail(error, this.get('formFields'), this.get('formSettings'), changeset);
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

    discardChanges(changeset) {
      changeset.rollback();
    },

    clearForm() {
      // TODO add option for suppress defaults
      this.send('generateChangeset', this.get('formSchema'), {});
      this.send('generateFormObject', this.get('formSchema'), this.get('fieldComponentsMap'));
      if (this.get('formSettings.submitAfterClear')) {
        this.send('submit', this.get('changesetProp'), this.get('formSettings.modelName'));
      }
    }
  }
});