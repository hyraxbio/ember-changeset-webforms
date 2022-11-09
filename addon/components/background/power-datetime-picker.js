import Component from '@ember/component';
import layout from '../../templates/components/background/power-datetime-picker';
import { computed } from '@ember/object'; 
import keyCodesMap from 'ember-changeset-webforms/utils/keycodes-map';

export default Component.extend({
  layout,
  classNames: ['ember-power-datetime-picker'],
  attributeBindings: ['data-test-id'],
  'data-test-type': "power-datetime-picker",

  defaultHour: computed('defaultTime', function() {
    if (!this.get('defaultTime')) { return '00'; }
    return this.get('defaultTime').split(':')[0] || '00';
  }),

  defaultMinute: computed('defaultTime', function() {
    if (!this.get('defaultTime')) { return '00'; }
    return this.get('defaultTime').split(':')[1] || '00';
  }),

  defaultSecond: computed('defaultTime', function() {
    if (!this.get('defaultTime')) { return '00'; }
    return this.get('defaultTime').split(':')[2] || '00';
  }),

  didInsertElement: function() {
    if (this.get('defaultDate')) {
      this.set('selectedDate', this.get('defaultDate'));
    }
    if (this.get('defaultTime')) {
      this.set('selectedHour', this.get('defaultHour'));
      this.set('selectedMinute', this.get('defaultMinute'));
      this.set('selectedSecond', this.get('defaultSecond'));
    }
    if (this.get('calendarStartMonth')) {
      var split = this.get('calendarStartMonth').split('/');
      this.set('calendarStartDate', moment().year(parseInt(split[1])).month(parseInt(split[0]) - 1).day(1));
    }
    
    if (moment.isDate(this.value)) {
      this.send('updateDateTime', this.value);
    } else if (moment(this.value).isValid()) {
      this.send('updateDateTime', moment(this.value, this.dateDisplayFormat).toDate());
    } 
  },

  navButtons: computed('center', function() {
    var allowNavigationOutOfRange = this.get('allowNavigationOutOfRange');
    return {
      nextMonth: allowNavigationOutOfRange || this.targetInRange(1, 'months'),
      nextYear: allowNavigationOutOfRange || this.targetInRange(1, 'years'),
      previousMonth: allowNavigationOutOfRange || this.targetInRange(-1, 'months'),
      previousYear: allowNavigationOutOfRange || this.targetInRange(-1, 'years'),
    };
  }),

  dateDisplayFormat: computed('dateFormat', function() {
    return `${this.dateFormat} ${this.timeFormat}`; // TODO this must be a global option
  }),

  timeFormatParts: computed('timeFormat', 'isTwelveHourFormat', function() {
    const timePart = this.timeFormat.trim().split(' ')[0];
    return timePart.replace('s.S', 's:S').split(':').map(item => {
      const obj = {
        formatChar: item,
        min: '0'
      };
      if (item.startsWith('h') && this.isTwelveHourFormat) {
        obj.min = '1';
        obj.max = '12';
        obj.label = 'Hours'; // TODO make configurable
        obj.type = 'hour';
      } else if (item.startsWith('H') && !this.isTwelveHourFormat) {
        obj.max = '23';
        obj.label = 'Hours' // TODO make configurable
        obj.type = 'hour';
      } else if (item.startsWith('k')) {
        obj.min = '1';
        obj.max = '24';
        obj.label = 'Hours'; // TODO make configurable
        obj.type = 'hour';
      } else if (item.startsWith('m')) {
        obj.max = '59';
        obj.label = 'Minutes';// TODO make configurable
        obj.type = 'minutes';
      } else if (item.startsWith('s')) {
        obj.max = '59';
        obj.label = 'Seconds'// TODO make configurable
        obj.type = 'seconds';
      } else if (item.startsWith('S')) {
        obj.max = '999';
        obj.label = 'Milliseconds';// TODO make configurable
        obj.type = 'milliseconds';
      } 
      return obj;
    });
  }),

  isTwelveHourFormat: computed('timeFormat', function() {
    return this.timeFormat.trim().startsWith('h') && this.timeFormat.trim().toLowerCase().split(' ').indexOf('a') > -1;
  }),

  parsedDatepickerPlaceholder: computed('datepickerPlaceholder', 'dateDisplayFormat', function() {
    return this.get('datepickerPlaceholder') || this.get('dateDisplayFormat');
  }),

  actions: {
    onDateInputChange(event) {
      const value = event.target.value;
      var dateDisplayFormat = this.get('dateDisplayFormat');
      if (moment(value, dateDisplayFormat, true).isValid()) {
        this.send('updateDateTime', moment(value, dateDisplayFormat).toDate());
      } else {
        event.target.value = this.value;
      }
    },

    onDateInputKeyUp(event) {
      const value = event.target.value;
      var dateDisplayFormat = this.get('dateDisplayFormat');
      if (moment(value, dateDisplayFormat, true).isValid()) {
        this.send('updateDateTime', moment(value, dateDisplayFormat).toDate());
      }
    },

    checkDateInputFocus() {
      if (this.get('dateInputFocussed')) { return false;}
      return true;
    },

    onDateInputFocus() {
      this.set('dateInputFocussed', true);
    },

    onDateInputBlur() {
      this.set('dateInputFocussed', false);
    },

    clearDateTime: function() {
      this.onSelectDateTime(null);
    },

    dateClicked(dropdown, value) {
      this.send('setDate', value.date);
      if (this.get('closeDatePickerOnSelect')) {
        dropdown.actions.close();
      }
    },

    setDate: function(selectedDate) {
      var currentDateTime = this.get('value');
      var currentHour = moment(currentDateTime).hour();
      var currentMinute = moment(currentDateTime).minute();
      var currentSecond = moment(currentDateTime).second();
      var newDateTime;
      if (currentDateTime) {
        newDateTime = moment(selectedDate).hour(currentHour).minute(currentMinute).second(currentSecond).toDate();
      } else {
        newDateTime = moment(selectedDate).hour(this.get('defaultHour')).minute(this.get('defaultMinute')).second(this.get('defaultSecond')).toDate();
      }
      this.send('updateDateTime', newDateTime);
    },

    setTime: function(unit, event) {
      var currentDateTime = this.get('value');
      if (event.target.getAttribute('min') && event.target.getAttribute('max')) {
        event.target.value = this.conformBounds(event.target.value, {min: event.target.getAttribute('min'), max: event.target.getAttribute('max'), length: unit.length});
      }
      let value = event.target.value;

      var newDateTime;
      if (unit.startsWith('h')) {
        if (moment(currentDateTime, this.dateDisplayFormat).format('a') === 'pm' && parseInt(value) < 12) {
          value = parseInt(value) + 12
        } else if (moment(currentDateTime, this.dateDisplayFormat).format('a') === 'am' && parseInt(value) === 12) {
          value = 0;
        }
        newDateTime = moment(currentDateTime, this.dateDisplayFormat).hour(value);
      } else if (unit.startsWith('H')) {
        newDateTime = moment(currentDateTime, this.dateDisplayFormat).hour(value);
      } else if (unit.startsWith('m')) {
        newDateTime = moment(currentDateTime, this.dateDisplayFormat).minute(value);
      } else if (unit.startsWith('s')) {
        newDateTime = moment(currentDateTime, this.dateDisplayFormat).second(value);
      } else if (unit.startsWith('S')) {
        newDateTime = moment(currentDateTime, this.dateDisplayFormat).millisecond(value);
      } else if (unit.toLowerCase().startsWith('a')) {
        if (moment(currentDateTime, this.dateDisplayFormat).format('a') !== value) {
          const currentHour = moment(currentDateTime, this.dateDisplayFormat).hour();
          let newHour; 
          if (value === 'am') {
            newHour = currentHour - 12;
          } else if (value === 'pm') {
            newHour = currentHour + 12;
          }
          newDateTime = moment(currentDateTime, this.dateDisplayFormat).hour(newHour);
        } else {
          newDateTime = moment(currentDateTime, this.dateDisplayFormat);
        }
      }
      this.send('updateDateTime', newDateTime);
    },

    onKeyDownTimePartInput(unit, event) {
      const { keys } = keyCodesMap;
      if (event.keyCode !== keys.arrowUp && event.keyCode !== keys.arrowDown) {
        return;
      }
      event.preventDefault();
      let newValue;
      let increment;
      if (event.keyCode === keys.arrowUp) {
          increment = 1;

        if (event.shiftKey) {
          increment = 10;
        }
        if (event.shiftKey && event.ctrlKey) {
          increment = 100;
        }
        let initialValue = event.target.value ? parseInt(event.target.value) : 0;
        newValue = initialValue += increment;
      } 
      if (event.keyCode === keys.arrowDown) {
        increment = 1;

        if (event.shiftKey) {
          increment = 10;
        }
        if (event.shiftKey && event.ctrlKey) {
          increment = 100;
        }
        let initialValue = event.target.value ? parseInt(event.target.value) : 0;
        newValue = initialValue = initialValue - increment;
      }
      if (!increment) { return; }
      event.target.value = newValue;
      
      this.send('setTime', unit, event);
    },

    onKeyUpTimePartInput(unit, event) {
      this.send('setTime', unit, event);
    },

    onFocusInAmPm(event) {
      event.target.value = '';
    },

    onChangeAmPm(event) {
      var currentDateTime = this.get('value');
      const value = event.target.value.toLowerCase();
      if (value !== 'am' && value !== 'pm') {
        event.target.value = moment(currentDateTime, this.dateDisplayFormat).format('a');
      }
      this.send('setTime', 'a', event);
    },

    onKeyUpAmPm(event) {
      const { keys } = keyCodesMap;
      const amKeyCodes = [keys.a, keys.arrowUp];
      const pmKeyCodes = [keys.p, keys.arrowDown];
      const clearKeyCodes = [keys.backspace, keys.delete]
      if (event.keyCode === keys.m) {
        if (event.target.value === 'amm') {
          event.target.value = 'am';
        }
        if (event.target.value === 'pmm') {
          event.target.value = 'pm';
        }
      }
      if (amKeyCodes.indexOf(event.keyCode) > -1) {
        event.target.value = 'am';
      }
      if (pmKeyCodes.indexOf(event.keyCode) > -1) {        
        event.target.value = 'pm';
      }
      if (clearKeyCodes.indexOf(event.keyCode) > -1) {        
        event.target.value = '';
      }
    },

    updateDateTime(dateTime) {
      this.set('center', dateTime);
      this.set('selectedDate', dateTime);
      this.onSelectDateTime(dateTime);
    },

    onTriggerFocus: function() {
      if (this.get('center')) { return; }
      var startDate = this.get('calendarStartDate') || moment().toDate()
      if (this.get('maxDate') < moment().toDate()) {
        startDate = this.get('maxDate');
      }
      if (this.get('minDate') > moment().toDate() ||
        this.get('minDate') < moment().toDate() && this.get('maxDate') < moment().toDate() ||
        this.get('minDate') > moment().toDate() && this.get('maxDate') > moment().toDate()) {
        startDate = this.get('minDate');
      }
      this.set('center', startDate);
    },

    navigate: function(datepicker, span, units) {
      if (this.get('allowNavigationOutOfRange') || this.targetInRange(span, units)) {
        datepicker.actions.moveCenter(span, units);
      }
    },

    selectDay: function(datepicker, span, units) {
      var targetDay;
      var startOfVisibleMonth = moment(this.get('center')).startOf('month').toDate();
      var endOfVisibleMonth = moment(this.get('center')).endOf('month').toDate();
      var currentSelected = moment(this.get('selectedDate'));
      if (this.get('selectedDate') >= startOfVisibleMonth && this.get('selectedDate') <= endOfVisibleMonth) {
        targetDay = currentSelected.add(span, units);
      } else {
        targetDay = startOfVisibleMonth;
      }
      if (targetDay > this.get('maxDate')) {
        targetDay = this.get('maxDate');
      }
      if (targetDay < this.get('minDate')) {
        targetDay = this.get('minDate');
      }
      this.set('selectedDate', targetDay);
      this.set('center', this.get('selectedDate'));
    },

    onTriggerKeydown(datepicker, e) {
      if (e.keyCode === 13) {
        this.send('setDate', this.get('selectedDate'));
        e.preventDefault();
      }
      if (e.keyCode === 39) {
        if (e.metaKey) {
          if (e.shiftKey) {
            this.send('navigate', datepicker, 1, 'years');
          } else {
            this.send('navigate', datepicker, 1, 'months');
          }
        } else {
          this.send('selectDay', datepicker, 1, 'days');
        }
        e.preventDefault();
      }
      if (e.keyCode === 37) {
        if (e.metaKey) {
          if (e.shiftKey) {
            this.send('navigate', datepicker, -1, 'years');
          } else {
            this.send('navigate', datepicker, -1, 'months');
          }
        } else {
          this.send('selectDay', datepicker, -1, 'days');
        }
        e.preventDefault();
      }
      if (e.keyCode === 40) {
        if (!datepicker.isOpen) {
          datepicker.actions.open();
        } else {
          this.send('selectDay', datepicker, 7, 'days');

        }
        e.preventDefault();
      }
      if (e.keyCode === 38) {
        if (!datepicker.isOpen) {
          datepicker.actions.open();
        } else {
          this.send('selectDay', datepicker, -7, 'days');

        }
        e.preventDefault();
      }
    },
  },

  targetInRange: function(span, units) {
    var firstOfTargetMonth = moment(this.get('center')).add(span, units).startOf('month').toDate();
    var lastOfTargetMonth = moment(this.get('center')).add(span, units).endOf('month').toDate();
    if (firstOfTargetMonth > this.get('maxDate') || lastOfTargetMonth < this.get('minDate')) {
      return false;
    }
    return true;
  },

  conformBounds(value, opts) {
    const int = parseInt(value);
    const max = parseInt(opts.max);
    const min = parseInt(opts.min);
    if (int < min) { return min.toLocaleString('en-US', {minimumIntegerDigits: opts.length, useGrouping:false}); }
    else if (int > max) { return max; }
    return int.toLocaleString('en-US', {minimumIntegerDigits: opts.length, useGrouping:false});
  }
});
// TODO
// Bundle ember truth helpers or remove or statements