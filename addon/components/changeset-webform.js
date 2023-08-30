import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/changeset-webform';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import isPromise from 'ember-changeset-webforms/utils/is-promise';
import { tracked } from '@glimmer/tracking';

@tagName('')
@templateLayout(layout)
export default class ChangesetWebform extends Component {
  @tracked changesetWebform;
  @tracked formFields;

  get formSettings() {
    if (!this.changesetWebform) {
      return;
    }
    return this.changesetWebform.formSettings;
  }

  get formFields() {
    if (!this.formObject) {
      return;
    }
    return this.formObject.formFields;
  }

  get needsValidation() {
    var formFields = this.formFields || [];
    return formFields.find((field) => {
      field.validationRules = field.validationRules || [];
      return field.validationRules.length > 0;
    });
  }

  get changeset() {
    return (this.changesetWebform || {}).changeset;
  }

  get formValidationClass() {
    if (!this.changeset) {
      return null;
    }
    if (this.changeset.get('isInvalid')) {
      return 'validation-failed';
    }
    if (this.changeset.get('isValid')) {
      return 'validation-passed';
    }
    return null;
  }

  @action
  didInsert() {
    this.send(
      'generateChangesetWebform',
      this.formSchema,
      this.data,
      this.customValidators
    );
  }

  @action
  generateChangesetWebform(formSchema, data, customValidators, opts) {
    this.changesetWebform = createChangesetWebform(
      formSchema,
      data,
      customValidators,
      opts
    );
    if (this.afterGenerateChangesetWebform) {
      this.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }

  @action
  onFieldValueChangeAction(formField, changeset, snapshot) {
    if (this.onFieldValueChange) {
      this.onFieldValueChange(formField, this.changesetWebform, snapshot);
    }
  }

  @action
  afterFieldValidationAction(formField, _changeset, fieldValidationErrors) {
    if (this.afterFieldValidation) {
      this.afterFieldValidation(
        formField,
        this.changesetWebform,
        fieldValidationErrors
      );
    }
  }

  @action
  onUserInteractionAction(formField, eventType, value, event) {
    if (this.onUserInteraction) {
      this.onUserInteraction(
        formField,
        this.changesetWebform,
        eventType,
        value,
        event
      );
    }
  }

  @action
  submitForm(changesetWebform) {
    const changeset = changesetWebform.changeset;
    validateFields(changesetWebform)
      .then((validationResult) => {
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
          } catch (err) {
            console.log(err);
          }
          changesetWebform.formSettings.requestInFlight = true;
          if (this.submitAction) {
            changeset
              .save()
              .then((savedChangeset) => {
                try {
                  var submitAction = this.submitAction(
                    savedChangeset.data,
                    changesetWebform
                  );
                  if (isPromise(submitAction)) {
                    submitAction
                      .then((submitActionResponse) => {
                        changesetWebform.formSettings.requestInFlight = false;
                        if (this.submitSuccess) {
                          this.submitSuccess(
                            submitActionResponse,
                            changesetWebform
                          );
                        }
                        if (
                          changesetWebform.formSettings.clearFormAfterSubmit
                        ) {
                          this.send('clearForm', changesetWebform);
                        }
                      })
                      .catch((error) => {
                        changesetWebform.formSettings.requestInFlight = false;
                        if (this.submitError) {
                          this.submitError(error, changesetWebform);
                        }
                      });
                  } else {
                    changesetWebform.formSettings.requestInFlight = false;
                    var submitActionResponse = submitAction;
                    if (this.submitSuccess) {
                      this.submitSuccess(
                        submitActionResponse,
                        changesetWebform
                      );
                    }
                    if (changesetWebform.formSettings.clearFormAfterSubmit) {
                      this.send('clearForm', changesetWebform);
                    }
                  }
                } catch (error) {
                  changesetWebform.formSettings.requestInFlight = false;
                  if (this.submitError) {
                    this.submitError(error, changesetWebform);
                  }
                }
              })
              .catch((err) => {
                changesetWebform.formSettings.requestInFlight = false;
                if (this.submitError) {
                  this.submitError(err, changesetWebform);
                }
              });
          } else {
            changeset
              .save()
              .then((saveChangesetResponse) => {
                changesetWebform.formSettings.requestInFlight = false;
                if (this.submitSuccess) {
                  this.submitSuccess(saveChangesetResponse, changesetWebform);
                }
                if (changesetWebform.formSettings.clearFormAfterSubmit) {
                  this.send('clearForm', changesetWebform);
                }
              })
              .catch((error) => {
                if (this.submitError) {
                  this.submitError(error, changesetWebform);
                }
                changesetWebform.formSettings.requestInFlight = false;
              });
          }
        } else {
          if (this.formValidationFailed) {
            this.formValidationFailed(changesetWebform);
          }
        }
      })
      .catch((err) => {
        // TODO see how this is called
        changesetWebform.formSettings.requestInFlight = false;
        this.formValidationFailed(changesetWebform, err);
      });
  }

  @action
  discardChanges(changesetWebform) {
    changesetWebform.changeset.rollback();
  }

  @action
  clearForm(changesetWebform) {
    // TODO test for this
    const opts = {
      suppressDefaults:
        changesetWebform.formSettings.clearFormAfterSubmit ===
        'suppressDefaultValues',
    };
    if (this.beforeReset) {
      this.beforeReset(changesetWebform);
    }
    this.send(
      'generateChangesetWebform',
      this.formSchema,
      null,
      this.customValidators,
      opts
    );
    if (changesetWebform.formSettings.submitAfterClear) {
      this.send('submitForm', this.changesetWebform);
    }
  }
}
