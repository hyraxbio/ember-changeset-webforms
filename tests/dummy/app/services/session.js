import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  navCollapsed: false,
  hideContent: null,
  placeholdersSupported: '',
  fileAPISupported: '',
  testDynamic: 'bar',
  init() {
    this._super(...arguments);
    this.userUiState = {};
    this.signupFormSchema = {
      title: 'Sign up form',
      formName: 'signUpForm',
      modelName: 'user',
      recordToUpdate: this.get('model'),
      fields: [{
          fieldId: 'name',
          fieldLabel: 'Name',
          fieldType: 'input',
          validationRules: [{ 'validationMethod': 'required' }],
          validationEvents: ['focusOut', 'keyUp'],
          defaultValue: 'Foo',
          dynamicValue: this.get('testDynamic'),
        },
        {
          fieldId: 'email',
          fieldLabel: 'Email',
          fieldType: 'input',
          validationRules: [{ 'validationMethod': 'required' }, { 'validationMethod': 'isEmail' }],
          inputType: 'email',
        },
        {
          fieldId: 'bio',
          fieldLabel: 'Bio',
          fieldType: 'textarea',
          inputType: 'text',
          validationRules: [{ 'validationMethod': 'required' }],
        },
        {
          fieldLabel: "Phone number",
          fieldId: "personal_details.phone_number",
          fieldType: "input",
          validationRules: [{ 'validationMethod': 'required' }],
          inputType: "text",
        },
        {
          fieldId: 'text',
          fieldType: 'textSeparator',
          text: "Physical Address",
          textElement: 'h3'
        },
        {
          fieldLabel: "Address line 1",
          fieldId: "personal_details.address.address_line1",
          fieldType: "input",
          validationRules: [{ 'validationMethod': 'required' }],
          inputType: "text",
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
          fieldLabel: "Birth date",
          fieldId: "personal_details.birth_date",
          fieldType: "powerDatePicker",
          validationRules: [{ 'validationMethod': 'required' }, { 'validationMethod': 'isDate' }],
          validationEvents: ['insert'],
          minDate: moment("2016-11-05").toDate(),
          maxDate: moment("2019-12-05").toDate(),
          allowNavigationOutOfRange: false,
          calendarStartMonth: '09/2018',
          defaultDate: moment("2018-08-28").toDate(),
          // dateFormat:'YYYY/MM/DD',
          // defaultTime: '12:07',
          timeSelect: true,
          // dateButtonText: 'Test date',
          // timeButtonText: 'Test time'
        },

        {
          fieldId: 'settings.mailing_list',
          fieldType: "singleCheckbox",
          validationRules: [{ 'validationMethod': 'required' }],
          label: 'Do you agree join the mailing list?'
        },
        {
          fieldId: 'account_status_text',
          fieldType: 'staticContent',
          fieldLabel: 'Account Status',
          text: 'active',
          hidden: true,
          textElement: 'div',
          textElementClass: 'badge',
          contentComponent: 'static-content-field',
          contentComponentClass: 'test-class',
          fieldClass: 'account-status'
        },
        {
          fieldLabel: "Test",
          fieldId: "test",
          fieldType: "dateRange",
          validationRules: [{ 'validationMethod': 'required' }, { 'validationMethod': 'isDateRange' }],
          validationEvents: ['insert'],
          triggerClasses: 'btn btn-warning',
          calendarContainerClasses: 'pop-up-box box-arrow',
          minDate: moment("2016-11-05").toDate(),
          maxDate: moment("2019-12-05").toDate(),
          calendarStartMonth: '09/2018', // Not implemented
          allowNavigationOutOfRange: false, //Not implemented
          dateFormat:'YYYY/MM/DD',
          startTime: '00:01',
          endTime: '23:59',
          // defaultValue: {
          //   start: moment("2015-08-28").toDate(),
          //   end: moment("2023-08-28").toDate()
          // }
          // defaultStartDate: moment("2015-08-28").toDate(),
          // defaultEndDate: moment("2023-08-28").toDate(),
          // startDate: {
          //   defaultDate: moment("2018-08-28").toDate(),
          // },
          // endDate: {
          //   defaultDate: moment("2017-08-28").toDate(),
          // }
        },
      ]
    };
  }
});
