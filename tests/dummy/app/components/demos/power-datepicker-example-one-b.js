import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';

export default class PowerDateickerExampleOneBComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-1b.js
  formSchema = {
    formSettings: {
      formName: 'powerDatapickerExample1b',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        fixedTime: '23:59:59.999',
        dateTimeDisplayFormat: 'YYYY-MM-DD',
      },
    ],
  };
  // END-SNIPPET
}
