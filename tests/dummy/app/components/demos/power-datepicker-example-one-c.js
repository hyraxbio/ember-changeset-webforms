import Component from '@glimmer/component';

export default class PowerDateickerExampleOneCComponent extends Component {
  // BEGIN-SNIPPET power-datepicker-example-1c.js
  powerDatapickerExample1cFormSchema = {
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
