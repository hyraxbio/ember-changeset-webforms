import Component from '@glimmer/component';

export default class PowerDatepickerExampleThreeAComponent extends Component {
  // BEGIN-SNIPPET power-datepicker-example-3a.js
  powerDatapickerExample3aFormSchema = {
    formSettings: {
      formName: 'powerDatapickerExample3a',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'startDate',
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm',
        closeDatePickerOnSelect: true,
        showTimeSelector: true,
        timeSelectorFields: 'HH,mm',
        defaultValue: moment('2022-11-03 14:42', 'YYYY-MM-DD HH:mm'),
      },
    ],
  };
  // END-SNIPPET
}
