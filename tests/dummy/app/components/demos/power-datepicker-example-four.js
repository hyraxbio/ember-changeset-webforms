import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';
import moment from 'moment';

export default class PowerDateickerExampleFourComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-4.js
  formSchema = {
    formSettings: {
      formName: 'powerDatapickerExample4',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD h:mm:ss a',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'h,mm,ss',
        defaultValue: moment('2022-11-03 14:42:19 p', 'YYYY-MM-DD h:mm:ss a'),
      },
    ],
  };
  // END-SNIPPET
}
