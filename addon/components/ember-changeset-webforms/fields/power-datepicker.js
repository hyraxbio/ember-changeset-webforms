import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/power-datepicker';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    onSelectDateTime(dateTime) {
      var formField = this.get('formField');
      if (formField.dateRangeSettings) {
        var rangePartner = this.get('formFields').findBy('fieldId', formField.dateRangeSettings.rangePartnerFieldId);
        if (rangePartner) {
          if (rangePartner.dateRangeSettings.rangePosition === 'start') {
            rangePartner.set('maxDate', dateTime);
          } else if (rangePartner.dateRangeSettings.rangePosition === 'end') {
            rangePartner.set('minDate', dateTime);
          }
        }        
      }
      const formatted = dateTime ?  moment(dateTime).format(`${this.formField.dateTimeFormat.replace(/S{1,}/, 'SSS')}`).toString() : null; // TODO this must default simply to moment(dateTime).toDate() to accommodate ember attr 'date', and allow user to specify output function to overridde this when defining field.
      this.onChange(formField, formatted, 'optionSelected');
    }
  }
});
