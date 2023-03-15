export default {
  passwordField: '[data-test-id="password-field"]',
  emailField: '[data-test-id="email-field"]',
  recoveryEmailField: '[data-test-id="recoveryEmail-field"]',
  nameField: '[data-test-id="name-field"]',
  firstNameField: '[data-test-id="firstName-field"]',
  lastNameField: '[data-test-id="lastName-field"]',
  acceptTermsTrueRadioButton: '[data-test-id="acceptTerms-radio-option-true"]',
  countryField: '[data-test-id="country-field"]',
  acceptTermsField: '[data-test-id="acceptTerms-field"]',
  confirmHumanField: '[data-test-id="confirmHuman-field"]',
  step1: '[data-test-id="step-1"]',
  step2: '[data-test-id="step-2"]',
  nextButton: '[data-test-id="next-button"]',
  previousButton: '[data-test-id="previous-button"]',

  onFieldValueChangeForm: '[data-test-id="after-field-edit-form"]',
  onFieldValueChangeFeedback: '[data-test-id="after-field-edit-feedback"]',
  afterFieldValidationForm: '[data-test-id="after-field-validation-form"]',
  afterFieldValidationFeedback: '[data-test-id="after-field-validation-feedback"]',
  integratingCustomValidatorsForm: '[data-test-id="integrating-custom-validators-form"]',
  afterGenerateChangesetWebformForm: '[data-test-id="after-generate-changeset-webform-form"]',
  afterGenerateChangesetWebformFeedback: '[data-test-id="after-generate-changeset-webform-feedback"]',
  clonableFieldBasics: '[data-test-id="clonable-field-basics"]',
  clonableFieldWithData: '[data-test-id="clonable-field-with-data"]',
  cloneGroupEmails: '[data-test-id="clone-group-emails"]',
  clonableFieldCountries: '[data-test-id="clonable-field-countries"]',

  powerDatepickerInput: '[data-test-id="power-datepicker-input"]',
  powerDatepicker24HourTimeSelect: '[data-test-id="power-datepicker-24-hour-time-select"]',
  powerDatepicker12HourTimeSelect: '[data-test-id="power-datepicker-12-hour-time-select"]',
  powerDatepickerUnusualFormat: '[data-test-id="power-datepicker-unusual-format"]',
  powerDatepickerCustomTimeSelect: '[data-test-id="power-datepicker-custom-time-select"]',
  powerDatepickerBasicUse: '[data-test-id="power-datepicker-basic-use"]',
  powerDatepickerAdvancedUse: '[data-test-id="power-datepicker-advanced-use"]',
  powerDatepickerMinMaxDate: '[data-test-id="power-datepicker-min-max-date"]',
  
  startDateField: '[data-test-id="startDate-field"]',
  powerDatepickerAmPmInput: '[data-test-id="power-datepicker-am-pm-input"]',
  rawDateTime: '[data-test-id="raw-date-time"]',
  outputFieldValue: '[data-test-id="output-field-value"]',
  ecwPowerDatepickerDropdown: '[data-test-id="ecw-power-datepicker-dropdown"]',
  timeSelector: '[data-test-id="time-selector"]',
  timeSelectorField: '[data-test-class="time-selector-field"]',
  timeSelectorFieldLabel: '[data-test-class="time-selector-field-label"]',
  timeSelectorFieldInput: '[data-test-class="time-selector-field-input"]',
  timeSelectorFieldLabelHour: '[data-test-id="time-selector-field-label-hour"]',
  timeSelectorFieldInputHour: '[data-test-id="time-selector-field-input-hour"]',
  timeSelectorFieldLabelMinutes: '[data-test-id="time-selector-field-label-minutes"]',
  timeSelectorFieldInputMinutes: '[data-test-id="time-selector-field-input-minutes"]',
  timeSelectorFieldLabelSeconds: '[data-test-id="time-selector-field-label-seconds"]',
  timeSelectorFieldInputSeconds: '[data-test-id="time-selector-field-input-seconds"]',
  timeSelectorFieldLabelMilliseconds: '[data-test-id="time-selector-field-label-milliseconds"]',
  timeSelectorFieldInputMilliseconds: '[data-test-id="time-selector-field-input-milliseconds"]',

  singleCheckboxBasicUse: '[data-test-id="single-checkbox-basic-use"]',
  
  cwfSubmitFormButton: '[data-test-id="cwf-submit-form-button"]',


  dataDate(date) {
    return `[data-date="${date}"]`;
  }
  
  
}