export default {
  emberChangesetWebformsField: '[data-test-ember-changeset-webforms-field]',
  emberChangesetWebformsFieldErrors: '[data-test-class="ember-changeset-webforms-field-errors"]',
  emberChangesetWebformsFieldError: '[data-test-class="ember-changeset-webforms-field-error"]',
  emberChangesetWebformsResetButton: '[data-test-id="ember-changeset-webforms-reset-form-button"]',
  emberChangesetWebformsSubmitButton: '[data-test-id="ember-changeset-webforms-submit-form-button"]',
  emberChangesetWebformsFieldRequired: '[data-test-ember-changeset-webforms-field-required]',
  emberChangesetWebformsFieldValidates: '[data-test-ember-changeset-webforms-field-validates]',
  
  emberChangesetWebformsCloneWrapper: '[data-test-class="ember-changeset-webforms-clone-wrapper"]',
  emberChangesetWebformsCloneField: '[data-test-ember-changeset-webforms-clone-field]',
  
  addClone: '[data-test-id="add-clone"]',
  removeClone: '[data-test-class="remove-clone"]',
  emberChangesetWebformsClonedField: '[data-test-class="cloned-field"]',
  emberChangesetWebformsAddCloneButton: '[data-test-id="add-clone"]',
  maxClonesReached: '[data-test-id="max-clones-reached"]',

  cloneField(opts) {
    return `[data-test-id="${opts.fieldId}-clone-${opts.cloneId}-field"]`
  },

  cloneSelector(opts) {
    return `[data-test-id="${opts.fieldId}-clone-${opts.cloneId}-wrapper"]`
  }
}