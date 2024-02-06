import Component from '@glimmer/component';

export default class PowerDatePickerExampleOneComponent extends Component {
  // BEGIN-SNIPPET power-datepicker-example-1.js
  powerDatapickerExample1FormSchema = {
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
      },
    ],
  };
}
