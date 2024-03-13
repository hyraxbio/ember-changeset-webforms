import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';

export default class PowerDatePickerExampleOneComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-1.js
  formSchema = {
    formSettings: {
      formName: 'powerDatapickerExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'validatedDate',
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
