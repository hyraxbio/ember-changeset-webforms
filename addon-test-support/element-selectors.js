export default {
  cwfField: '[data-test-cwf-field]',
  cwfFieldErrors: '[data-test-class="cwf-field-errors"]',
  cwfFieldError: '[data-test-class="cwf-field-error"]',
  cwfResetButton: '[data-test-id="cwf-reset-form-button"]',
  cwfSubmitButton: '[data-test-id="cwf-submit-form-button"]',
  cwfFieldRequired: '[data-test-cwf-field-required]',
  cwfFieldValidates: '[data-test-cwf-field-validates]',
  
  cwfCloneWrapper: '[data-test-class="cwf-clone-wrapper"]',
  cwfCloneField: '[data-test-cwf-clone-field]',
  
  cwfAddClone: '[data-test-id="add-clone"]',
  cwfRemoveClone: '[data-test-class="cwf-remove-clone"]',
  cwfMaxClonesReached: '[data-test-id="cwf-max-clones-reached"]',

  cloneField(opts) {
    return `[data-test-id="${opts.fieldId}-clone-${opts.cloneId}-field"]`
  },

  cloneSelector(opts) {
    return `[data-test-id="${opts.fieldId}-clone-${opts.cloneId}-wrapper"]`
  }
}