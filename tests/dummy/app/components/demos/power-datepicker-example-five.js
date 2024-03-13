import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';

export default class PowerDatePickerExampleFiveComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-5.js
  formSchema = {
    formSettings: {
      formName: 'powerDatapickerExample5',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'HH:mm:ss.SSSSS DD.MM.YYYY',
        dateTimeDisplayFormat: 'DD/MM/YYYY HH:mm:ss.SSSSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'HH,mm,ss,SSSSS',
        defaultValue: '14:42:19.14223 03.11.2022',
      },
    ],
  };
  // END-SNIPPET
}
