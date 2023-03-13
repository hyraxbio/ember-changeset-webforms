import Component from '@ember/component';import { computed } from '@ember/object';
import layout from '../templates/components/changeset-webform';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import isPromise from 'ember-changeset/utils/is-promise';

export default Component.extend({
  layout,
  classNames: ['ember-changeset-webforms'],

  didInsertElement() {
    this.send('generateChangesetWebform', this.get('formSchema'), this.get('data'), this.get('customValidators'));
  },  

  formSettings: computed('changesetWebform.formSettings', function() {
    return this.get('changesetWebform.formSettings')
  }),
  
  formFields: computed('formObject', function() {
    return this.get('formObject.formFields');
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
    generateChangesetWebform(formSchema, data, customValidators) {
      this.set('changesetWebform', createChangesetWebform(formSchema, data, customValidators));
      if (this.get('afterGenerateChangesetWebform')) {
        this.afterGenerateChangesetWebform(this.get('changesetWebform'));
      } 
    },

    onFieldValueChange(formField, changeset, snapshot) {
       if (this.get('onFieldValueChange')) {
        this.onFieldValueChange(formField, this.get('changesetWebform'), snapshot);
      }
    },

    afterFieldValidation(formField, _changeset, fieldValidationErrors) {
      if (this.afterFieldValidation) {
        this.afterFieldValidation(formField, this.get('changesetWebform'), fieldValidationErrors);
      }
    },

    onUserInteraction(formField, eventType, value, event) {
      if (this.onUserInteraction) {
        this.onUserInteraction(formField, this.changesetWebform, eventType, value, event)
      }
    },
   
    submit(changesetWebform) {
      const changeset = changesetWebform.changeset;
      validateFields(changesetWebform).then((validationResult) => {
        if (this.afterValidateFields) {
          this.afterValidateFields(changesetWebform, validationResult);
        }
        if (changeset.isValid) {
          if (this.formValidationPassed) {
            this.formValidationPassed(changesetWebform);
          }
          if (this.beforeSubmitAction) {
            this.beforeSubmitAction(changesetWebform);
          }
          castAllowedFields(changesetWebform);
          changesetWebform.formSettings.set('requestInFlight', true);
          if (this.submitAction) {
              changeset.save().then(savedChangeset => {
                try {
                  var submitAction = this.submitAction(savedChangeset.data, changesetWebform);
                  if (isPromise(submitAction)) {
                    submitAction.then(submitActionResponse => {
                      changesetWebform.formSettings.set('requestInFlight', false);
                      if (this.saveSuccess) {
                        this.saveSuccess(submitActionResponse, changesetWebform);
                      }
                      if (this.get('formSettings.resetAfterSubmit')) {
                        this.send('clearForm');
                      }
                    }).catch(error => {
                      changesetWebform.formSettings.set('requestInFlight', false);
                      if (this.get('saveFail')) {
                        this.saveFail(error, changesetWebform);
                      }
                    });
                  } else {
                    changesetWebform.formSettings.set('requestInFlight', false);
                    var submitActionResponse = submitAction;
                    if (this.get('saveSuccess')) {
                      this.saveSuccess(submitActionResponse, changesetWebform);
                    }
                  }
                } catch (error) {
                  if (this.get('saveFail')) {
                    this.saveFail(error, changesetWebform);
                  }
                }
              });
          } else {
            changeset.save().then(saveChangesetResponse => {
              changesetWebform.formSettings.set('requestInFlight', false);
              if (this.saveSuccess) {
                this.saveSuccess(saveChangesetResponse, changesetWebform);
              }
              if (changesetWebform.formSettings.resetAfterSubmit) {
                this.send('resetForm');
              }
            }).catch(error => {
              if (this.saveFail) {
                this.saveFail(error, changesetWebform);
              }
              changesetWebform.formSettings.set('requestInFlight', false);
            });
          }
        } else {
          if (this.formValidationFailed) {
            this.formValidationFailed(changesetWebform);
          }
        }
      }).catch(err => {
        // TODO see how this is called
        this.formValidationFailed(changesetWebform, err);
      });
    },

    discardChanges(changeset) {
      changeset.rollback();
    },

    clearForm() {
      // TODO add option for suppress defaults
      // TODO test for this
      this.send('generateChangesetWebform', this.get('formSchema'), null, this.get('customValidators'));
      if (this.get('formSettings.submitAfterClear')) {
        this.send('submit', this.changesetWebform);
      }
    }
  }
});