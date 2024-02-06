import Component from '@glimmer/component';

export default class PowerDateickerExampleFiveComponent extends Component {
  // BEGIN-SNIPPET power-datepicker-example-5.js
  powerDatapickerExample5FormSchema = {
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
        dateTimeDisplayFormat: 'DD/MM/YYYY HH:mm:ss.SSSS',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'HH,mm,ss,SS',
        defaultValue: '14:42:19.14223 03.11.2022',
        // defaultValue: moment(
        //   '14:42:19.14223 03.11.2022',
        //   'HH:mm:ss.SSSSS DD.MM.YYYY'
        // ),
        // defaultValue: new Date(2022, 10, 3, 14, 42, 19, 142),
        // TODO docs
      },
    ],
  };
  // END-SNIPPET
}
