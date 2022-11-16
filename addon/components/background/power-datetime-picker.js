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

  fixedTimeParsed: computed('fixedTime', function() {
    if (!this.fixedTime) {
      return;
    }
    const fixedTime = this.fixedTime.replace('.', ':');
    return {
      HH: fixedTime.split(':')[0], 
      mm: fixedTime.split(':')[1] || '00',
      ss: fixedTime.split(':')[2] || '00',
      SSS: fixedTime.split(':')[3] || '000'
    }
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
      this.send('updateDateTime', moment(this.value, this.parsedDateTimeFormat).toDate());
    } 

    if (this.fixedTime && this.showTimeSelector) {
      console.warn('[Ember Changeset Webforms] You have set showTimeSelector to true, but you have also passed fixedTime. fixedTime must be null in order to show the tine selector component.')
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

  parsedDateTimeFormat: computed('dateTimeFormat', function() {
    return this.dateTimeFormat.replace(/S{1,}/, 'SSS'); // TODO this must be a global option
  }),

  parsedDateTimeDisplayFormat: computed('parsedDateTimeFormat', 'dateTimeDisplayFormat', function() {
    return this.dateTimeDisplayFormat ? this.dateTimeDisplayFormat.replace(/S{1,}/, 'SSS') : this.parsedDateTimeFormat; // TODO this must be a global option
  }),


  showAmPmInput: computed('timeSelectorFields', function() {
    return this.timeSelectorFields.filter(field => field.startsWith('h')).length ? true : false;
  }),

  timeFormatParts: computed('timeSelectorFields', function() {
    return this.timeSelectorFields.map(item => {
      const obj = {
        formatChar: item,
        min: '0'
      };
      if (item.startsWith('h')) {
        obj.min = '1';
        obj.max = '12';
        obj.label = 'Hours'; // TODO make configurable
        obj.type = 'hour';
      } else if (item.startsWith('H')) {
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
        obj.formatChar = 'SSS';
        obj.max = '999';
        obj.label = 'Milliseconds';// TODO make configurable
        obj.type = 'milliseconds';
      } 
      return obj;
    }).filter(item => item.label);
  }),

  parsedDatepickerPlaceholder: computed('datepickerPlaceholder', 'parsedDateTimeDisplayFormat', function() {
    return this.get('datepickerPlaceholder') || this.get('parsedDateTimeDisplayFormat');
  }),

  validMoment(event) {
    var parsedDateTimeDisplayFormat = this.get('parsedDateTimeDisplayFormat');
    const value = event.target.value;
    const strictDateFormat = parsedDateTimeDisplayFormat.replace(/S{1,}/, 'SSSS');
    if (!moment(value, strictDateFormat, true).isValid()) {
      return null;
    }
    if (moment(value, parsedDateTimeDisplayFormat).isBefore(moment(this.minDate, 'YYYY-MM-DD'))) {
      return null;
    }
    if (moment(value, parsedDateTimeDisplayFormat).isAfter(moment(this.maxDate, 'YYYY-MM-DD'))) {
      return null;
    }
    return moment(value, parsedDateTimeDisplayFormat).toDate();
  },

  updateDate(selectedDate, currentDateTime) {
    var currentHour = moment(currentDateTime).hour();
    var currentMinute = moment(currentDateTime).minute();
    var currentSecond = moment(currentDateTime).second();
    var newDateTime;
    if (currentDateTime) {
      newDateTime = moment(selectedDate).hour(currentHour).minute(currentMinute).second(currentSecond).toDate();
    } else {
      newDateTime = moment(selectedDate).hour(this.get('defaultHour')).minute(this.get('defaultMinute')).second(this.get('defaultSecond')).toDate();
    }
    return newDateTime;
  },

  updateTimeUnit(unit, value, currentDateTime) {
    let newDateTime;
    if (unit.startsWith('h')) {
      if (moment(currentDateTime, this.parsedDateTimeFormat).format('a') === 'pm' && parseInt(value) < 12) {
        value = parseInt(value) + 12
      } else if (moment(currentDateTime, this.parsedDateTimeFormat).format('a') === 'am' && parseInt(value) === 12) {
        value = 0;
      }
      newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).hour(value);
    } else if (unit.startsWith('H')) {
      newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).hour(value);
    } else if (unit.startsWith('m')) {
      newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).minute(value);
    } else if (unit.startsWith('s')) {
      newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).second(value);
    } else if (unit.startsWith('S')) {
      newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).millisecond(value);
    } else if (unit.toLowerCase().startsWith('a')) {
      if (moment(currentDateTime, this.parsedDateTimeFormat).format('a') !== value) {
        const currentHour = moment(currentDateTime, this.parsedDateTimeFormat).hour();
        let newHour; 
        if (value === 'am') {
          newHour = currentHour - 12;
        } else if (value === 'pm') {
          newHour = currentHour + 12;
        }
        newDateTime = moment(currentDateTime, this.parsedDateTimeFormat).hour(newHour);
      } else {
        newDateTime = moment(currentDateTime, this.parsedDateTimeFormat);
      }
    }
    return newDateTime.toDate();
  },

  actions: {
    onDateInputChange(event) {
      if (this.validMoment(event)) {

        this.send('updateDateTime', this.validMoment(event));
      } else {
        event.target.value = this.value;
      }
    },

    onDateInputKeyUp(event) {
      if (this.validMoment(event)) {
        this.send('updateDateTime', this.validMoment(event));
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
      this.send('updateDateTime', this.updateDate(selectedDate, currentDateTime));
    },

    setTime: function(unit, event) {
      if (!event.target.value) {
        return;
      }
      if (event.target.getAttribute('min') && event.target.getAttribute('max')) {
        event.target.value = this.conformBounds(event.target.value, {min: event.target.getAttribute('min'), max: event.target.getAttribute('max'), length: unit.length});
      }
      let value = event.target.value;
      var currentDateTime = this.get('value');
      const newDateTime = this.updateTimeUnit(unit, value, currentDateTime);
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
      if (event.target.value.length >= unit.length ) {
        this.send('setTime', unit, event);
      }
    },

    onFocusInAmPm(event) {
      event.target.value = '';
    },

    onChangeAmPm(event) {
      var currentDateTime = this.get('value');
      const value = event.target.value.toLowerCase();
      if (value !== 'am' && value !== 'pm') {
        event.target.value = moment(currentDateTime, this.parsedDateTimeFormat).format('a');
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
      if (event.target.value === 'am' || event.target.value === 'pm') {
        this.send('setTime', 'a', event);
      }
    },

    updateDateTime(dateTime) {
      this.set('center', dateTime);
      if (this.fixedTimeParsed) {
        for (const key in this.fixedTimeParsed) {
          dateTime = this.updateTimeUnit(key, this.fixedTimeParsed[key], dateTime)
        }
      }
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