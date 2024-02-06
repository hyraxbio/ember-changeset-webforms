import { action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

class DateOutput {
  @tracked nativeJSFormat;
  @tracked fieldValue;

  constructor(props) {
    this.nativeJSFormat = props.nativeJSFormat;
    this.fieldValue = props.fieldValue;
  }
}
export default class BuiltInFields extends Controller {
  @service session;
  @tracked dateTimeOutput1;
  @tracked dateTimeOutput1a;
  @tracked dateTimeOutput1b;
  @tracked dateTimeOutput1c;
  @tracked dateTimeOutput2;
  @tracked dateTimeOutput3;
  @tracked dateTimeOutput3a;
  @tracked dateTimeOutput4;
  @tracked dateTimeOutput5;

  radioButtonGroupOption = {
    // BEGIN-SNIPPET radio-button-group-option.js
    value: null, //
    // Either one of labelComponent or label must be passed.
    label: null, // String to display as the label of the option.
    labelComponent: null, // Optional. Component to replace the standard label element for a single option.
    // END-SNIPPET
  };

  checkboxGroupOption = {
    // BEGIN-SNIPPET checkbox-group-option.js
    key: null,
    // Either one of labelComponent or label must be passed.
    label: null, // String to display as the label of the option.
    labelComponent: null, // Optional. Component to replace the standard label element for a single option
    // END-SNIPPET
  };





  // BEGIN-SNIPPET power-datepicker-example-1d.js
  powerDatapickerExample1dFormSchema = {
    formSettings: {
      formName: 'powerDatapickerExample1d',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateTimeDisplayFormat: 'YYYY-MM-DD',
        minDate: '2022-11-10',
        maxDate: '2022-11-16',
      },
    ],
  };
  // END-SNIPPET
  // BEGIN-SNIPPET power-datepicker-example-2.js
  powerDatapickerExample2FormSchema = {
    formSettings: {
      formName: 'powerDatapickerExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'start',
          rangePartnerFieldId: 'endDate',
        },
      },
      {
        fieldId: 'endDate',
        fieldLabel: 'Last day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        defaultTime: '23:59:59',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'end',
          rangePartnerFieldId: 'startDate',
        },
      },
    ],
  };
  // END-SNIPPET

  clickerExample2FormSchema = this.session.clickerExample2FormSchema;

  @action
  onUserInteraction(...args) {
    console.log(args);
  }
}
