import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import validateFields from '../../utils/validate-fields';
import castAllowedFields from '../../utils/cast-allowed-fields';
import createChangeset from '../../utils/create-changeset';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-pojo-form'],

  
  didInsertElement() {
    var formSchema;
    console.log(this.get('formSchema'));
    if (this.get('formSchema')) {
      formSchema = this.get('formSchema');
    } else if (this.get('settings')) {
      formSchema = {
        settings: this.get('settings'),
        fields: this.get('fields')
      };
    }
    this.set('formObject', generateEmberValidatingFormFields(formSchema));
    this.set('changeset', createChangeset(this.get('formObject.formFields'), this.get('data'), this.get('customValidators')));
  },

  // formObject: computed('formSchema', 'settings', 'fields', function() {
  //   var formSchema;
  //   if (this.get('formSchema')) {
  //     formSchema = this.get('formSchema');
  //   } else if (this.get('settings')) {
  //     formSchema = {
  //       settings: this.get('settings'),
  //       fields: this.get('fields')
  //     };
  //   }
  //   return generateEmberValidatingFormFields(formSchema);
  // }),  

  // changeset: computed('formObject.{formFields}', function() {
  //   return createChangeset(this.get('formObject.formFields'), this.get('data'), this.get('customValidators'));
  // }),

  // formName: computed('formObject', function() {
  //   var formName = this.get('formObject.formMetaData.formName');
  //   if (!formName) {
  //     throw Error(`Your form schema must have a formName property.`);
  //   }

  //   if (formName.match(/[^a-z0-9]/gi,'')) {
  //     throw Error(`The formName property in your form schema may only contain alphanumeric characters.`);
  //   }
  //   return formName;
  // }),

  // formMetaData: computed('formObject', 'formName', function() {
  //   var storedformObject = this.get(`storageService.${this.get('formName')}`);
  //   if (storedformObject) {
  //     return storedformObject.formMetaData;
  //   } else {
  //     return this.get('formObject.formMetaData');
  //   }
  // }),

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
      var fieldObjects = this.get('formObject.formFields');
      var originalField = this.get('formSchema.fields').find((field, index) => {
        return field.fieldId === cloneGroupName;
      });
      var newField = generateEmberValidatingFormField(originalField);
      var cloneGroup = fieldObjects.filter(fieldObject => {
        return fieldObject.cloneGroupName === newField.cloneGroupName;
      });
      var lastCloneInView = cloneGroup[cloneGroup.length - 1];
      var lastCloneInViewIndex = this.get('formObject.formFields').indexOf(lastCloneInView);
      var sortedCloneGroup = cloneGroup.sort((a, b) => {
        return b.cloneGroupNumber - a.cloneGroupNumber;
      });
      newField.set('cloneGroupNumber', sortedCloneGroup[0].cloneGroupNumber + 1);
      newField.set('fieldId', `${newField.fieldId}-${newField.cloneGroupNumber + 1}`);
      newField.set('isClone', true);
      this.set('formObject.formFields', [ ...this.get('formObject.formFields').slice(0, lastCloneInViewIndex +1), newField, ...this.get('formObject.formFields').slice(lastCloneInViewIndex+1)]);
      this.send('checkCloneMax', cloneGroupName);
    },

    removeClone(formField, changeset, formFields) {
      formFields.removeObject(formField);
      this.send('checkCloneMax', formField.cloneGroupName);
    },

    checkCloneMax(cloneGroupName) {
      console.log(cloneGroupName);
      var fieldObjects = this.get('formObject.formFields');
      var maxClones = this.get('formSchema.fields').find((field, index) => {
        return field.fieldId === cloneGroupName;
      }).maxClones;
      var cloneGroup = fieldObjects.filter(fieldObject => {
        return fieldObject.cloneGroupName === cloneGroupName;
      });
      cloneGroup.setEach('lastClone', false);
      cloneGroup[cloneGroup.length - 1].set('lastClone', true);
      if (cloneGroup.length - 1 === maxClones) {
        cloneGroup.setEach('maxClonesPresent', true);
      } else {
        cloneGroup.setEach('maxClonesPresent', false);
      }
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