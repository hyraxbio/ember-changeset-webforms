import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  init: function() {
    this._super(...arguments);
    // this.customFieldSchema = {
    //   // fieldId: 'test',
    //   // fieldLabel: 'Name',
    //   // fieldType: 'textarea',
    //   // validationRules: [{'validationMethod': 'isEmail'}, {'validationMethod': 'custom'}, {'validationMethod': 'required'}],
    //   // validationEvents: ['focusOut', 'keyUp'],
    //   // inputType: 'email',

    //   fieldLabel: "Country",
    //   fieldId: 'personal_details.address.country',
    //   fieldType: "powerSelect",
    //   validationRules: [{ 'validationMethod': 'required' }],
    //   searchPlaceholder: 'Search Countries',
    //   options: [
    //     "Afghanistan",
    //     "Åland Islands",
    //     "Albania",
    //     "Algeria",
    //     "American Samoa",
    //     "Andorra",
    //     "Angola",
    //     "Anguilla",
    //     "Antarctica",
    //     "Antigua and Barbuda",
    //     "Argentina",
    //     "Armenia"
    //   ],
    // },

    this.inputTextField = {
      fieldId: 'name',
      fieldLabel: 'Name',
      fieldType: 'input',
      validationRules: [{ 'validationMethod': 'required' }],
      validationEvents: ['focusOut', 'keyUp'],
      inputType: 'text'
    };
    this.inputEmailField = {
      fieldId: 'email',
      fieldLabel: 'Email',
      fieldType: 'input',
      validationRules: [{ 'validationMethod': 'isEmail' }],
      inputType: 'email',
    };
    this.textareaField = {
      fieldId: 'bio',
      fieldLabel: 'Bio',
      fieldType: 'textarea',
      inputType: 'text',
      validationRules: [{ 'validationMethod': 'required' }],
    };

    this.textSeparatorField = {
      fieldId: 'text',
      fieldType: 'textSeparator',
      text: "Physical Address",
      textElement: 'h3'
    };

    this.powerSelectField = {
      fieldLabel: "Country",
      fieldId: 'personal_details.address.country',
      fieldType: "powerSelect",
      validationRules: [{ 'validationMethod': 'required' }],
      searchPlaceholder: 'Search Countries',
      options: [
        "Afghanistan",
        "Åland Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia"
      ],
    };

    this.radioButtonGroupField = {
      fieldId: 'acceptTerms',
      fieldType: "radioButtonGroup",
      fieldLegend: 'Do you agree to the terms?',
      validationRules: [{ 'validationMethod': 'required' }, { 'validationMethod': 'equals', 'arguments': 'true', 'errorMessage': 'You must accept the terms to continue.' }],
      options: [{
        'label': 'I agree',
        'value': 'true'
      }, {
        'label': 'I do not agree',
        'value': 'false'
      }]
    };

    this.checkboxGroupField = {
      fieldId: 'personal_details.favourite_colours',
      fieldType: "checkboxGroup",
      fieldLegend: 'Choose at least one colour',
      validationRules: [{ 'validationMethod': 'custom' }],
      options: [{
        'key': 'red',
        'label': 'Red'
      }, {
        'key': 'orange',
        'label': 'Orange'
      }, {
        'key': 'yellow',
        'label': 'Yellow'
      }, {
        'key': 'green',
        'label': 'Green'
      }, {
        'key': 'blue',
        'label': 'Blue'
      }, ],
    };

    this.powerDatePickerField = {
      fieldLabel: "Birth date",
      fieldId: "personal_details.birth_date",
      fieldType: "powerDatePicker",
      validationRules: [{ 'validationMethod': 'required' }, { 'validationMethod': 'isDate' }],
      validationEvents: ['insert'],
      minDate: moment("2016-11-05").toDate(),
      maxDate: moment("2019-12-05").toDate(),
      allowNavigationOutOfRange: false,
      calendarStartMonth: '09/2018',
      // defaultDate: moment("2018-08-28").toDate(),
      // dateFormat:'YYYY/MM/DD',
      // defaultTime: '12:07',
      timeSelect: true,
      // dateButtonText: 'Test date',
      // timeButtonText: 'Test time'
    };

    this.singleCheckboxField = {
      fieldId: 'settings.mailing_list',
      fieldType: "singleCheckbox",
      validationRules: [{ 'validationMethod': 'required' }],
      label: 'Do you agree join the mailing list?'
    };
  },

  actions: {
    customValidations: function() {

    },

    checkAllowNext: function() {

    },
  }
});
