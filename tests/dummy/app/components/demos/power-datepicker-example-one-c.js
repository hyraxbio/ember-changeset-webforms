import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';

export default class PowerDateickerExampleOneCComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-1c.js
  formSchema = {
    formSettings: {
      formName: 'powerDatapickerExample1c',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD',
        minDate: '2022-11-10',
        maxDate: '2022-11-16',
        calendarStartMonth: '11/2022',
      },
    ],
  };
  // END-SNIPPET
}
