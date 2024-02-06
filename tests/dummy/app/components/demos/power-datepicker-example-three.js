import Component from '@glimmer/component';

export default class PowerDateickerExampleThreeComponent extends Component {
  // BEGIN-SNIPPET power-datepicker-example-3.js
  powerDatapickerExample3FormSchema = {
    formSettings: {
      formName: 'powerDatapickerExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        defaultValue: moment(
          '2022-11-03 14:42:19.23456',
          'YYYY-MM-DD HH:mm:ss.SSS',
        ),
      },
    ],
  };
  // END-SNIPPET
}
