import Component from '@ember/component';import { computed } from '@ember/object';
import layout from '../templates/components/changeset-webform';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import isPromise from 'ember-changeset/utils/is-promise';

/**
  The component called to render a webform, based on a schema and data.

  ```hbs
  {{#docs-demo as |demo|}}
    {{#demo.example name='changeset-webform-component-basic.hbs'}}
      <ChangesetWebform @formSchema={{formSchema}} @data={{data}} />
    {{/demo.example}}

    {{demo.snippet 'changeset-webform-component-basic.hbs'}}
  {{/docs-demo}}
  ```
  
  @class DocsDemo
  @yield {Hash} demo
  @yield {Component} demo.example
  @yield {Component} demo.snippet
  @yield {Component} demo.liveExample
*/
export default Component.extend({
  layout,
  classNameBindings: ['validationFailed:validation-failed'],
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
    generateChangesetWebform(formSchema, data, customValidators) {
      this.set('changesetWebform', createChangesetWebform(formSchema, data, customValidators));
      if (this.get('afterGenerateChangesetWebform')) {
        this.afterGenerateChangesetWebform(this.get('changesetWebform'));
      } 
    },

    afterFieldEdit(formField, changeset, snapshot) {
       if (this.get('afterFieldEdit')) {
        this.afterFieldEdit(formField, this.get('changesetWebform'), snapshot);
      }
    },

    afterFieldValidation(formField, _changeset, fieldValidationErrors) {
      if (this.afterFieldValidation) {
        this.afterFieldValidation(formField, this.get('changesetWebform'), fieldValidationErrors);
      }
    },

    afterFieldClick(formField) {
      if (this.afterFieldClick) {
        this.afterFieldClick(formField, this.get('changesetWebform'))
      }
    },

    afterInputFocusOut(formField) {
      if (this.afterInputFocusOut) {
        this.afterInputFocusOut(formField, this.get('changesetWebform'));
      }
    },

    afterInputFocusIn(formField) {
      if (this.afterInputFocusIn) {
        this.afterInputFocusIn(formField, this.get('changesetWebform'));
      }
    },

    afterInputKeyUp: function(formField, changeset, value, event) {
      if (this.afterInputKeyUp) {
        this.afterInputKeyUp(formField, this.get('changesetWebform'), value, event);
      }
    },
   
    submit(changesetWebform) {
      const changeset = changesetWebform.changeset;
      validateFields(changesetWebform).then(() => {
        if (changeset.isValid) {
          if (this.beforeSubmitAction) {
            this.beforeSubmitAction(changesetWebform);
          }
          castAllowedFields(changesetWebform);
          this.set("requestInFlight", true);
          if (this.submitAction) {
              changeset.save().then(savedChangeset => {
                var submitAction = this.submitAction(savedChangeset.data, changesetWebform);
                if (isPromise(submitAction)) {
                  submitAction.then(submitActionResponse => {
                    this.set("requestInFlight", false);
                    if (this.saveSuccess) {
                      this.saveSuccess(submitActionResponse, changesetWebform);
                    }
                    if (this.get('formSettings.resetAfterSubmit')) {
                      this.send('clearForm');
                    }
                  }).catch(error => {
                    this.set("requestInFlight", false);
                    if (this.get('saveFail')) {
                      this.saveFail(error, changesetWebform);
                    }
                  });
                } else {
                  this.set("requestInFlight", false);
                  var submitActionResponse = submitAction;
                  if (this.get('saveSuccess')) {
                    this.saveSuccess(submitActionResponse, changesetWebform);
                  }
                }
              });
          } else {
            changeset.save().then(saveChangesetResponse => {
              this.set("requestInFlight", false);
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
              this.set("requestInFlight", false);
            });
          }
        } else {
          if (this.formValidationFailed) {
            this.formValidationFailed(changesetWebform);
          }
        }
      }).catch(err => {
        this.formValidationFailed(err);
      });
    },

    discardChanges(changeset) {
      changeset.rollback();
    },

    clearForm() {
      // TODO add option for suppress defaults
      this.send('generateFormObject', this.get('formSchema'), this.get('fieldComponentsMap'));
      this.send('generateChangeset', this.get('formSchema'), {});
      if (this.get('formSettings.submitAfterClear')) {
        this.send('submit', this.get('changesetProp'), this.get('formSettings.modelName'));
      }
    }
  }
});