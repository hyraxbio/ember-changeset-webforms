import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/power-datepicker';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  
  dateFormat: computed('formField.dateFormat', function() {
    return this.get('formField.dateFormat') || 'YYYY-MM-DD';
  }),
  timeFormat: computed('formField.timeFormat', function() {
    return this.get('formField.timeFormat') || 'HH:mm:ss';
  }),

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
      const formatted = dateTime ?  moment(dateTime).format(`${this.get('dateFormat')} ${this.get('timeFormat')}`).toString() : null;
      this.onUserInteraction(formField, formatted);
    }
  }
});
