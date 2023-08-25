import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/power-datepicker';

@templateLayout(layout)
@tagName('')
export default class PowerDatepicker extends Component {
  @computed('formField.timeSelectorFields')
  get timeSelectorFields() {
    return (this.formField.timeSelectorFields || '').split(',');
  }

  @action
  onSelectDateTime(dateTime) {
    var formField = this.formField;
    if (formField.dateRangeSettings) {
      var rangePartner = this.formFields.findBy('fieldId', formField.dateRangeSettings.rangePartnerFieldId);
      if (rangePartner) {
        if (rangePartner.dateRangeSettings.rangePosition === 'start') {
          rangePartner.maxDate = dateTime;
        } else if (rangePartner.dateRangeSettings.rangePosition === 'end') {
          rangePartner.minDate = dateTime;
        }
      }
    }
    const formatted = dateTime
      ? moment(dateTime)
          .format(`${this.formField.dateTimeFormat.replace(/S{1,}/, 'SSS')}`)
          .toString()
      : null; // TODO this must default simply to moment(dateTime).toDate() to accommodate ember attr 'date', and allow user to specify output function to override this when defining field.
    this.onChange(formField, formatted);
  }
}
