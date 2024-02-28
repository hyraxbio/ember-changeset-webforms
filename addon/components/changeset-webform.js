import { action } from '@ember/object';
import Component from '@glimmer/component';
import validateFields from 'ember-changeset-webforms/utils/validate-fields';
import castAllowedFields from 'ember-changeset-webforms/utils/cast-allowed-fields';
import createChangesetWebform from 'ember-changeset-webforms/utils/create-changeset-webform';
import isPromise from 'ember-changeset-webforms/utils/is-promise';
import { tracked } from '@glimmer/tracking';

export default class ChangesetWebform extends Component {
  @tracked changesetWebform;

  get formSettings() {
    if (!this.changesetWebform) {
      return null;
    }
    return this.changesetWebform.formSettings;
  }

  get formFields() {
    if (!this.formObject) {
      return null;
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
    this.generateChangesetWebform(
      this.args.formSchema,
      this.args.data,
      this.args.customValidators,
    );
  }

  @action
  generateChangesetWebform(formSchema, data, customValidators, opts) {
    this.changesetWebform = createChangesetWebform(
      formSchema,
      data,
      customValidators,
      opts,
    );
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }

  @action
  onFieldValueChangeAction(formField, changeset, snapshot) {
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, this.changesetWebform, snapshot);
    }
  }

  @action
  onFieldInsertedAction(formField) {
    if (this.args.onFieldInserted) {
      this.args.onFieldInserted(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldValidationAction(formField, _changeset, fieldValidationErrors) {
    if (this.args.afterFieldValidation) {
      this.args.afterFieldValidation(
        formField,
        this.changesetWebform,
        fieldValidationErrors,
      );
    }
  }

  @action
  onUserInteraction(formField, eventName, value, event) {
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(
        formField,
        this.changesetWebform,
        eventName,
        value,
        event,
      );
    }
  }

  @action
  submitForm(changesetWebform) {
    const changeset = changesetWebform.changeset;
    validateFields(changesetWebform)
      .then((validationResult) => {
        if (this.args.afterValidateFields) {
          this.args.afterValidateFields(changesetWebform, validationResult);
        }
        if (changeset.isValid) {
          if (this.args.formValidationPassed) {
            this.args.formValidationPassed(changesetWebform);
          }
          try {
            if (this.args.beforeSubmitAction) {
              this.args.beforeSubmitAction(changesetWebform); // TODO how to make this await or not.
            }
          } catch (err) {
            console.log(err);
          }
          try {
            castAllowedFields(changesetWebform); // TODO test this
          } catch (err) {
            console.log(err);
          }
          changesetWebform.formSettings.requestInFlight = true;
          if (this.args.submitAction) {
            changeset
              .save()
              .then((savedChangeset) => {
                try {
                  var submitAction = this.args.submitAction(
                    savedChangeset.data,
                    changesetWebform,
                  );
                  if (isPromise(submitAction)) {
                    submitAction
                      .then((submitActionResponse) => {
                        changesetWebform.formSettings.requestInFlight = false;
                        if (this.args.submitSuccess) {
                          this.args.submitSuccess(
                            submitActionResponse,
                            changesetWebform,
                          );
                        }
                        if (
                          changesetWebform.formSettings.clearFormAfterSubmit
                        ) {
                          this.clearForm(changesetWebform);
                        }
                      })
                      .catch((error) => {
                        changesetWebform.formSettings.requestInFlight = false;
                        if (this.args.submitError) {
                          this.args.submitError(error, changesetWebform);
                        }
                      });
                  } else {
                    changesetWebform.formSettings.requestInFlight = false;
                    var submitActionResponse = submitAction;
                    if (this.args.submitSuccess) {
                      this.args.submitSuccess(
                        submitActionResponse,
                        changesetWebform,
                      );
                    }
                    if (changesetWebform.formSettings.clearFormAfterSubmit) {
                      this.clearForm(changesetWebform);
                    }
                  }
                } catch (error) {
                  changesetWebform.formSettings.requestInFlight = false;
                  if (this.args.submitError) {
                    this.args.submitError(error, changesetWebform);
                  }
                }
              })
              .catch((err) => {
                changesetWebform.formSettings.requestInFlight = false;
                if (this.args.submitError) {
                  this.args.submitError(err, changesetWebform);
                }
              });
          } else {
            changeset
              .save()
              .then((saveChangesetResponse) => {
                changesetWebform.formSettings.requestInFlight = false;
                if (this.args.submitSuccess) {
                  this.args.submitSuccess(
                    saveChangesetResponse,
                    changesetWebform,
                  );
                }
                if (changesetWebform.formSettings.clearFormAfterSubmit) {
                  this.clearForm(changesetWebform);
                }
              })
              .catch((error) => {
                if (this.args.submitError) {
                  this.args.submitError(error, changesetWebform);
                }
                changesetWebform.formSettings.requestInFlight = false;
              });
          }
        } else {
          if (this.args.formValidationFailed) {
            this.args.formValidationFailed(changesetWebform);
          }
        }
      })
      .catch((err) => {
        // TODO see how this is called
        changesetWebform.formSettings.requestInFlight = false;
        if (this.args.formValidationFailed) {
          this.args.formValidationFailed(changesetWebform, err);
        }
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
    if (this.args.beforeReset) {
      this.args.beforeReset(changesetWebform);
    }
    this.generateChangesetWebform(
      this.args.formSchema,
      null,
      this.args.customValidators,
      opts,
    );
    if (changesetWebform.formSettings.submitAfterClear) {
      this.submitForm(this.changesetWebform);
    }
  }
}
