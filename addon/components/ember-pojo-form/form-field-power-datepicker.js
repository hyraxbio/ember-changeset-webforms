import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-power-datepicker';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',
  emberPojoForms: service(),

  actions: {
    onSelectDateTime(dateTime) {
      var changeset = this.get('changeset');
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
      this.onUserInteraction(formField, dateTime);
    }
  }
});
