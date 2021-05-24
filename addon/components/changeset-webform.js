
import Component from '@ember/component';
import { computed } from '@ember/object';
import parseChangesetWebformFields from 'ember-changeset-webforms/utils/parse-changeset-webform-schema';
import layout from '../templates/components/changeset-webform';
import { inject as service } from '@ember/service';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangeset from 'ember-changeset-webforms/utils/create-changeset';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import { assign } from '@ember/polyfills';
import isPromise from 'ember-changeset/utils/is-promise';
import EmberObject from '@ember/object';

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
  EmberChangesetWebforms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-changeset-webforms'],

  didInsertElement() {
    this.fieldComponentsMap = assign(this.get('EmberChangesetWebforms.defaultFieldElementComponents'), this.get('EmberChangesetWebforms.customFieldElementComponents'));
    this.send('generateChangesetWebform', this.get('formSchema'), this.get('fieldComponentsMap'), this.get('data'), this.get('customValidators'));
    this.send('generateFormObject', this.get('formSchema'), this.get('fieldComponentsMap'));
    this.send('generateChangeset', this.get('formSchema'), this.get('data'));
  },  

  formSettings: computed('formSchema', function() {
    return assign(EmberObject.create(this.get('EmberChangesetWebforms.defaultSettings') || {}), EmberObject.create(this.get('EmberChangesetWebforms.settings') || {}), EmberObject.create(this.get('formSchema.settings') || {}));
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
    generateChangesetWebform(formSchema, fieldComponentsMap, data, customValidators) {
      this.set('changesetWebform', createChangesetWebform(formSchema, fieldComponentsMap, data, customValidators));
      if (this.get('afterGenerateChangesetWebform')) {
        this.afterGenerateChangesetWebform(this.get('changesetWebform'));
      } 
    },

    generateChangeset(formSchema, data) {
      this.set('changesetProp', createChangeset(formSchema.fields, data, this.get('customValidators')));
      if (this.get('afterGenerateChangeset')) {
        this.afterGenerateChangeset(this.get('changesetProp'));
      } 
    },

    generateFormObject(formSchema, fieldComponentsMap) {
      this.set('formObject', parseChangesetWebformFields(formSchema, fieldComponentsMap));
      // if (this.get('afterGenerateWebform')) {
      //   this.afterGenerateWebform(this.get('formObject'));
      // } 
    },

    afterFieldEdit(fieldId, changeset, formField, snapshot) {
       if (this.get('afterFieldEdit')) {
        this.afterFieldEdit(this.get('formFields'), fieldId, this.get('formSettings'), changeset, snapshot);
      }
    },

    onClick(fieldId, formField, changeset) {
      if (this.onClick) {
        this.onClick(this.get('formFields'), fieldId, formField, changeset)
      }
    },

    afterFieldValidation(fieldValidationErrors, formField, changeset) {
      if (this.afterFieldValidation) {
       this.afterFieldValidation(fieldValidationErrors, formField, changeset, this.get('formFields'), this.get('formSettings'));
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
      this.send('generateFormObject', this.get('formSchema'), this.get('fieldComponentsMap'));
      this.send('generateChangeset', this.get('formSchema'), {});
      if (this.get('formSettings.submitAfterClear')) {
        this.send('submit', this.get('changesetProp'), this.get('formSettings.modelName'));
      }
    }
  }
});