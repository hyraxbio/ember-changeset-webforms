import PowerDatePickerExampleGeneric from './power-datepicker-example-generic';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';
export default class PowerDateickerExampleThreeComponent extends PowerDatePickerExampleGeneric {
  // BEGIN-SNIPPET power-datepicker-example-3.js
  formSchema = {
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
