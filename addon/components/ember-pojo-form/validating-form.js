import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import validateFields from '../../utils/validate-fields';
import castAllowedFields from '../../utils/cast-allowed-fields';
import createChangeset from '../../utils/create-changeset';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';
import { assign } from '@ember/polyfills';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-pojo-form'],

  init() {
    this._super(...arguments);
    this.fieldComponentsMap = assign(this.get('emberPojoForms.defaultFieldElementComponents'), this.get('emberPojoForms.customFieldElementComponents'));
    this.formSettings = assign(this.get('emberPojoForms.defaultSettings'), this.get('emberPojoForms.settings'));
  },

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
    return generateEmberValidatingFormFields(formSchema, this.get('fieldComponentsMap'));
  }),  

  changeset: computed('formSchema.fields', function() {
    return createChangeset(this.get('formSchema.fields'), this.get('data'), this.get('customValidators'));
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
    cloneField(cloneGroupName) {
      this.send('cloneField2', cloneGroupName);
      return;
      if (this.cloneGroupVisible(cloneGroupName).length >= this.maxAllowedClones(cloneGroupName)) { return; }
      var originalField = this.get('formSchema.fields').find((field, index) => {
        return field.fieldId === cloneGroupName;
      });
      var newField = generateEmberValidatingFormField(originalField, this.get('fieldComponentsMap'));
      var lastCloneInView = this.cloneGroup(cloneGroupName)[this.cloneGroup(cloneGroupName).length - 1];
      var lastCloneInViewIndex = this.get('formObject.formFields').indexOf(lastCloneInView);
      if (this.cloneGroupHidden(cloneGroupName).length > 0) {
        var firstHiddenField = this.cloneGroupHidden(cloneGroupName)[0];
        firstHiddenField.set('hidden', false);
        var firstHiddenFieldIndex = this.get('formObject.formFields').indexOf(firstHiddenField);
        // Reconstruct formFields with the field that has just been un-hidden moved to the end of this clone group.
        this.set('formObject.formFields', [ ...this.get('formObject.formFields').slice(0, firstHiddenFieldIndex), ...this.get('formObject.formFields').slice(firstHiddenFieldIndex + 1, lastCloneInViewIndex +1), firstHiddenField, ...this.get('formObject.formFields').slice(lastCloneInViewIndex+1)]);
      } else {
        var newFieldCloneNumber = this.cloneGroup(cloneGroupName).sort((a, b) => {
          return b.cloneGroupNumber - a.cloneGroupNumber;
        })[0].cloneGroupNumber + 1;
        newField.set('cloneGroupNumber', newFieldCloneNumber);
        newField.set('fieldId', `${originalField.fieldId}-${newFieldCloneNumber}`);
        newField.set('isClone', true);
        // Reconstruct formFields with the newly generated field at the end of this clone group.
        this.set('formObject.formFields', [ ...this.get('formObject.formFields').slice(0, lastCloneInViewIndex +1), newField, ...this.get('formObject.formFields').slice(lastCloneInViewIndex+1)]);
      } 
      this.send('checkCloneMax', cloneGroupName);
    },

    

    customTransforms(fieldId, changeset) {
       if (this.get('customTransforms')) {
        this.customTransforms(this.get('formFields'), fieldId, this.get('formMetaData'), changeset);
      }
    },

    submit(changeset, modelName) {
      validateFields(this.get('formFields'), changeset).then(validateResponse => {
        if (changeset.isValid) {
          castAllowedFields(this.get('formFields'), changeset);
          this.set("requestInFlight", true);
          if (this.get('submitAction')) {
            // TODO this must first save the changeset.
            this.submitAction(changeset.data, modelName, changeset).then(submitActionResponse => {
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

    resetForm() {
      this.set('formObject', generateEmberValidatingFormFields(this.get('formSchema')));
      if (this.afterReset) { 
        this.afterReset(); // TODO this must send the changeset
      } 
    }
    
  }
});