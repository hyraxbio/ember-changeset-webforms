import Component from '@ember/component';
import layout from '../../templates/components/background/power-date-range-picker';
import updateTime from 'ember-changeset-webforms/ember-changeset-webforms/utils/update-time';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['ember-power-daterange-picker'],
  'data-test-type': "power-daterange-picker",

  didInsertElement() {
    var minDate = this.get('minDate');
    var maxDate = this.get('maxDate');
    var defaultStartDate = this.get('defaultStartDate');
    var defaultEndDate = this.get('defaultEndDate');

    if (defaultStartDate < minDate) {
      defaultStartDate = minDate;
      console.warn('Your default start date is before the earliest allowed date. It has been changed to the earliest allowed date.');
    }

    if (defaultEndDate > maxDate) {
      defaultEndDate = maxDate;
      console.warn('Your default end date is after the latest allowed date. It has been changed to the latest allowed date.');
    }

    if (minDate > maxDate) {
      throw Error('You have added a date range component where the earliest allowed date is after the latest allowed date. As such, users will not be able to select any dates.');
    }

    var range = {};
    if (defaultStartDate || defaultEndDate) {
      range.start = defaultStartDate;
      range.end = defaultEndDate;
      this.onSelectDateRange(range);
    }
  },

  parsedDateTimeFormat: computed('dateFormat', function() {
    return this.get('dateFormat') || 'DD-MM-YYYY';
  }),

  noDatesSelected: computed('value', function() {
    return !this.get('value.start') && !this.get('value.end');
  }),

  displayValue: computed('value', function() {
    var value = this.get('value');
    if (!value) { return; }
    var parsedDateTimeFormat = this.get('parsedDateTimeFormat');
    var final = '';
    if (value.start) {
      final += moment(value.start).format(parsedDateTimeFormat) + ' - ';
    }
    if (value.end) {
      final += moment(value.end).format(parsedDateTimeFormat);
    }
    return final;
  }),

  actions: {
    rangeSelected(range) {
      range.start = updateTime(range.start, this.get('startTime'));
      range.end = updateTime(range.end, this.get('endTime'));
      this.onSelectDateRange(range);
    },

    onOpen() {
      if (this.onOpen) {
        this.onOpen();
      }
    },

    onClose() {
      if (this.onClose) {
        this.onClose();
      }
    }
  }
});