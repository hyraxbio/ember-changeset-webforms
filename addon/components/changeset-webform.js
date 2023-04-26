import Component from '@ember/component';import { computed } from '@ember/object';
import layout from '../templates/components/changeset-webform';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import isPromise from 'ember-changeset-webforms/utils/is-promise';

export default Component.extend({
  layout,
  classNames: ['ember-changeset-webforms'],

  didInsertElement() {
    this._super(...arguments);
    this.send('generateChangesetWebform', this.formSchema, this.data, this.customValidators);
  },  

  formSettings: computed.reads('changesetWebform.formSettings'),
  
  formFields: computed.reads('formObject.formFields'),

  needsValidation: computed('formFields', 'formFields.[]', function() {
    var formFields = this.formFields || [];
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
    generateChangesetWebform(formSchema, data, customValidators, opts) {
      this.set('changesetWebform', createChangesetWebform(formSchema, data, customValidators, opts));
      if (this.afterGenerateChangesetWebform) {
        this.afterGenerateChangesetWebform(this.changesetWebform);
      } 
    },

    onFieldValueChange(formField, changeset, snapshot) {
       if (this.onFieldValueChange) {
        this.onFieldValueChange(formField, this.changesetWebform, snapshot);
      }
    },

    afterFieldValidation(formField, _changeset, fieldValidationErrors) {
      if (this.afterFieldValidation) {
        this.afterFieldValidation(formField, this.changesetWebform, fieldValidationErrors);
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
          try {
            castAllowedFields(changesetWebform); // TODO must bring this back when cast is fixed.
          } catch(err) {
            console.log(err);
          }
          changesetWebform.formSettings.set('requestInFlight', true);
          if (this.submitAction) {
              changeset.save().then(savedChangeset => {
                try {
                  var submitAction = this.submitAction(savedChangeset.data, changesetWebform);
                  if (isPromise(submitAction)) {
                    submitAction.then(submitActionResponse => {
                      changesetWebform.formSettings.set('requestInFlight', false);
                      if (this.submitSuccess) {
                        this.submitSuccess(submitActionResponse, changesetWebform);
                      }
                      if (changesetWebform.formSettings.clearFormAfterSubmit) {
                        this.send('clearForm', changesetWebform);
                      }
                    }).catch(error => {
                      changesetWebform.formSettings.set('requestInFlight', false);
                      if (this.submitError) {
                        this.submitError(error, changesetWebform);
                      }
                    });
                  } else {
                    changesetWebform.formSettings.set('requestInFlight', false);
                    var submitActionResponse = submitAction;
                    if (this.submitSuccess) {
                      this.submitSuccess(submitActionResponse, changesetWebform);
                    }
                    if (changesetWebform.formSettings.clearFormAfterSubmit) {
                      this.send('clearForm', changesetWebform);
                    }
                  }
                } catch (error) {
                  changesetWebform.formSettings.set('requestInFlight', false);
                  if (this.submitError) {
                    this.submitError(error, changesetWebform);
                  }
                }
              }).catch(err => {
                changesetWebform.formSettings.set('requestInFlight', false);
                if (this.submitError) {
                  this.submitError(err, changesetWebform);
                }
              });
          } else {
            changeset.save().then(saveChangesetResponse => {
              changesetWebform.formSettings.set('requestInFlight', false);
              if (this.submitSuccess) {
                this.submitSuccess(saveChangesetResponse, changesetWebform);
              }
              if (changesetWebform.formSettings.clearFormAfterSubmit) {
                this.send('clearForm', changesetWebform);
              }
            }).catch(error => {
              if (this.submitError) {
                this.submitError(error, changesetWebform);
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
        changesetWebform.formSettings.set('requestInFlight', false);
        this.formValidationFailed(changesetWebform, err);
      });
    },

    discardChanges(changesetWebform) {
      changesetWebform.changeset.rollback();
    },

    clearForm(changesetWebform) {
      // TODO test for this
      const opts = { 
        suppressDefaults: (changesetWebform.formSettings.clearFormAfterSubmit === 'suppressDefaultValues')
      }
      if (this.beforeReset) {
        this.beforeReset(changesetWebform);
      }
      this.send('generateChangesetWebform', this.formSchema, null, this.customValidators, opts);
      if (this.formSettings.submitAfterClear) {
        this.send('submit', this.changesetWebform);
      }
    }
  }
});