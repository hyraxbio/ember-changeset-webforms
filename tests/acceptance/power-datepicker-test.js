import { visit, focus, find, blur, click, findAll, typeIn, fillIn, currentURL, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';
import keyCodesMap from 'ember-changeset-webforms/utils/keycodes-map';
import qUnitExtend from './test-helpers';

module('Acceptance | Power datepicker field', function(hooks) {
  setupApplicationTest(hooks);
  qUnitExtend.qunitModuleHooks(hooks);
  setupMirage(hooks);

  test('Main input (24 hour format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    assert.dom(dummyEls.powerDatepickerAmPmInput).doesNotExist('AM/PM input not shown when HH passed as the hour input format.')
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:42:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:42:19.234'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '16'
      }]
    });


    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:51:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:81:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:51:57.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:51:81.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:51:57.873',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.873'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '873'
      }]
    });
    
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.873'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '873'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 16:51:57.88888888888',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 16:51:57.888'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '888'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-12-03 16:51:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-12-03 16:51:19.234'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 31 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-12-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-12-31 16:51:19.234'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2028-12-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2028-12-31 16:51:19.234'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2028-02-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2028-12-31 16:51:19.234'
      }]
    });
  });

  test('Main input (12 hour format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    assert.dom(dummyEls.powerDatepickerAmPmInput).exists('AM/PM input shown when h passed as the hour input format.')

    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);
    const timeSelectorAmPmInput = find(dummyEls.powerDatepickerAmPmInput);
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 04:42:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 4:42:19 pm'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '4'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:19 pm'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 02:81:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:19 pm'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:19 pm'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 2:51:57 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 pm'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 pm'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 pm'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 2:51:57 am',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 am'
      }, {
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 am'
      }, {
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:51:57 am'
      }, {
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-12-03 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-12-03 2:51:19 pm'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 31 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2022-12-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-12-31 2:51:19 pm'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2028-12-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2028-12-31 2:51:19 pm'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime'
      },
      fillIn: '2028-02-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2028-12-31 2:51:19 pm'
      }]
    });
  });  

  test('Arrow keys - hour controls (24 hours format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await checkIncrements(assert, {
      iterations: 25,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 0,
      max: 23
    });
    await checkIncrements(assert, {
      iterations: 4,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 0,
      max: 23,
      modifiers: {
        shiftKey: true
      }
    });
  });

  test('Arrow keys - hour controls (12 hour format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await checkIncrements(assert, {
      iterations: 13,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 1,
      max: 12,
      digits: 1
    });
    await checkIncrements(assert, {
      iterations: 4,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 1,
      max: 12,
      digits: 1,
      modifiers: {
        shiftKey: true
      }
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      keyName: 'arrowUp',
      expectedInputValuesAfterKeyUp: [{
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '2'
      }]
    });
  });

  test('Arrow keys - minute controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinuteInput = find(dummyEls.timeSelectorInputMinutes);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMinuteInput,
        description: 'Minute'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Minutes',
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorMinuteInput,
        description: 'Minute'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Minutes',
      min: 0,
      max: 59,
      modifiers: {
        shiftKey: true
      }
    });
  });

  test('Arrow keys - second controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Seconds',
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Seconds',
      min: 0,
      max: 59,
      modifiers: {
        shiftKey: true
      }
    });
  });

  test('Arrow keys - millisecond controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 10,
      digits: 3,
      upStart: 990
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 100,
      upStart: 990,
      digits: 3,
      modifiers: {
        shiftKey: true
      }
    });
    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 900,
      upStart: 0,
      digits: 3,
      modifiers: {
        shiftKey: true,
        ctrlKey: true
      }
    });
  });

  test('Typed input - hour controls (12 hour clock)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
await this.pauseTest();
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 12:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      fillIn: '21',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 12:42:19 pm'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '12'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 13:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 1:42:19 pm'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '1'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 20:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      fillIn: '8',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 8:42:19 pm'
      },{
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '8'
      }]
    });
  });

  test('Typed input - hour controls (24 hour clock)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 23:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 23:42:19.234'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '23'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 00:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 00:42:19.234'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '00'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 21:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      typeInVal: '21',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 21:42:19.234'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '21'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 08:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour'
      },
      typeInVal: '08',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 08:42:19.234'
      }, {
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '08'
      }]
    });
  });

  test('Typed input - minute controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes'
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:59:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '59'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:00:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes'
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:00:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '00'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:34:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes'
      },
      typeInVal: '34',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:34:19.234'
      }, {
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '34'
      }]
    });
  });

  test('Typed input - second controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:59 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds'
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:59.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '59'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds'
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:00.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '00'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:34 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds'
      },
      typeInVal: '34',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:34.234'
      }, {
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '34'
      }]
    });
  });

  test('Typed input - millisecond controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:19.999'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '999'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:19.000'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '000'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds'
      },
      typeInVal: '334',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 14:42:19.334'
      }, {
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '334'
      }]
    });
  });

  test('AM PM controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    await focus(dateTimeInput);
    const amPmInput = find(`${parentFieldSelector} ${dummyEls.powerDatepickerAmPmInput}`);
    assert.equal(amPmInput.value, 'pm', 'AM/PM input begins with value "pm".');
   
    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      inputValuesAfterBlur: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      typeInVal: 'a',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 am'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      typeInVal: 'p',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      typeInVal: 'am',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 am'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      typeInVal: 'pm',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      typeInVal: 'zzzz',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      keyName: 'arrowUp',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 am'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      keyName: 'arrowDown',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'Datetime',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      keyName: 'delete',
      inputValuesAfterBlur: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM'
      },
      keyName: 'backspace',
      inputValuesAfterBlur: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '2022-11-03 2:42:19 pm'
      }, {
        input: amPmInput,
        description: 'AM/PM',
        value: 'pm'
      }]
    });
  });

  test('Millisecond digits', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepickerUnusualFormat;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);
    assert.equal(dateTimeInput.value, '03/11/2022 14:42:19.142', 'Fractional seconds in the date time input are trimmed to 3 decimals where format and passed data specifies more than 3 decimals');
    await focus(dateTimeInput);
    assert.equal(timeSelectorMillisecondsInput.value, '142', 'Milliseconds input forced top 3 digits where format for milliseconds input specifies less than 3 digits.');
  });

  test('Display date format differs from date format', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepickerUnusualFormat;
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    assert.dom(`${parentFieldSelector} ${dummyEls.outputFieldValue}`).hasText('14:42:19.142 03.11.2022', 'Value output by the field is [14:42:19.142 03.11.2022]');
    assert.equal(dateTimeInput.value, '03/11/2022 14:42:19.142', 'Value of the date input field is [03/11/2022 14:42:19.142]');
    assert.dom(`${parentFieldSelector} ${dummyEls.rawDateTime}`).hasText('Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)', 'Field value is [Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)].');
    await fillIn(dateTimeInput, '03/11/2022 14:41:19.142');
    await triggerKeyEvent(dateTimeInput, "keyup", '1');
    assert.dom(`${parentFieldSelector} ${dummyEls.outputFieldValue}`).hasText('14:41:19.142 03.11.2022', 'Value output by the field is [14:41:19.142 03.11.2022]');
    assert.equal(dateTimeInput.value, '03/11/2022 14:41:19.142', 'Value of the date input field is [03/11/2022 14:41:19.142]');
    assert.dom(`${parentFieldSelector} ${dummyEls.rawDateTime}`).hasText('Thu Nov 03 2022 14:41:19 GMT+0200 (South Africa Standard Time)', 'Field value is [Thu Nov 03 2022 14:41:19 GMT+0200 (South Africa Standard Time)].');

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValueAfterKeyUp: '14:59:19.142 03.11.2022',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes'
      },
      typeInVal: '59',
      expectedInputValuesAfterKeyUp: [{
        input: dateTimeInput,
        description: 'Datetime',
        value: '03/11/2022 14:59:19.142'
      }]
    });
  });
});

async function check(assert, opts) {
  const { keys } = keyCodesMap;
  const initialRawDateTime = (find(`${opts.parentFieldSelector} ${dummyEls.rawDateTime}`) || {}).textContent;
  const initialOutputFieldValue = (find(`${opts.parentFieldSelector} ${dummyEls.outputFieldValue}`) || {}).textContent;
  const element = opts.inputToUpdate.element;

  ['expectedInputValuesAfterKeyUp', 'expectedInputValuesAfterKeyUp'].forEach(eventType => {
    opts[eventType] = opts[eventType] || [];
    opts[eventType].forEach(item => {
      item.initialValue = item.input.value;
    })
  });

  let assertionPrefix;
  await focus(element);
  if (opts.typeInVal) {
    await fillIn(element, '');
    await triggerKeyEvent(element, "keyup", '1');
    await typeIn(element, opts.typeInVal);
    assertionPrefix = `Type in "${opts.typeInVal}" in ${opts.inputToUpdate.description} input`;
  } else if (opts.fillIn) {
    await fillIn(element, opts.fillIn);
    await triggerKeyEvent(element, "keyup", '1');
    assertionPrefix = `Fill in "${opts.fillIn}" in ${opts.inputToUpdate.description} input`;
  } else if (opts.keyName) {
    await triggerKeyEvent(element, "keydown", keys[opts.keyName], opts.modifiers);
    await triggerKeyEvent(element, "keyup", keys[opts.keyName], opts.modifiers);
    let keysDescription = '';
    for (const key in opts.modifiers || {}) {
      keysDescription  += `${key.replace('Key', '')} + `;
    }
    keysDescription += opts.keyName;
    assertionPrefix = `Special key "${keysDescription}" in ${opts.inputToUpdate.description} input`;
  } else {
    assertionPrefix = `Focus in and blur of ${opts.inputToUpdate.description} input`;
  }

  const valueComparison = (initial, after) => {
    if (initial === after) {
      return `REMAINS ${initial}`;
    } else {
      return `UPDATES from ${initial} to ${after}`;
    }
  }

  const checkExpectedVals = (event) => {
    if (opts[`expectedRawDateTimeAfter${event}`]) {
      assert.dom(`${opts.parentFieldSelector} ${dummyEls.rawDateTime}`).hasText(opts[`expectedRawDateTimeAfter${event}`], `[${assertionPrefix} => ${event}] Value of raw date time ${valueComparison(initialRawDateTime, opts[`expectedRawDateTimeAfter${event}`])}`);
    }
    if (opts[`expectedFieldValueAfter${event}`]) {
      assert.dom(`${opts.parentFieldSelector} ${dummyEls.outputFieldValue}`).hasText(opts[`expectedFieldValueAfter${event}`], `[${assertionPrefix} => ${event}] Value of field ${valueComparison(initialOutputFieldValue, opts[`expectedFieldValueAfter${event}`])}`);
    }
    
    for (const item of opts[`expectedInputValuesAfter${event}`] || []) {
      assert.equal(item.input.value, item.value, `[${assertionPrefix} => ${event}] ${item.description} input ${valueComparison(item.initialValue, item.input.value)}`);
    }
  }

  checkExpectedVals('KeyUp');
  await blur(element);
  checkExpectedVals('Blur');
  assert.ok(true, '---------------------------------------');

}

async function checkIncrements(assert, opts) {
  const downStart = opts.downStart;
  const upStart = opts.upStart || '0';
  const digits = opts.digits || 2;

  await fillIn(opts.inputToUpdate.element, upStart);
  await triggerKeyEvent(opts.inputToUpdate.element, "keyup", '1');

  const iterations = Array.from({length: opts.iterations}, (_, i) => i + 1);

  let increment = 1;
  if ((opts.modifiers || {}).shiftKey && (opts.modifiers || {}).ctrlKey) {
    increment = 100;
  } else if ((opts.modifiers || {}).shiftKey) {
    increment = 10;
  } 

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.inputToUpdate.element.value);
    const expectedValue = currentValue + increment > opts.max ? opts.max : currentValue + increment;
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      inputToUpdate: opts.inputToUpdate,
      keyName: 'arrowUp',
      modifiers: opts.modifiers,
      expectedInputValuesAfterKeyUp: [{
        input: opts.inputToUpdate.element,
        description: opts.inputDescription,
        value: expectedValue.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false})
      }],
    });
  }

  if (downStart) {
    await fillIn(opts.inputToUpdate.element, downStart);
    await triggerKeyEvent(opts.inputToUpdate.element, "keyup", '1');
  }  

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.inputToUpdate.element.value);
    const expectedValue = currentValue - increment < opts.min ? opts.min : currentValue - increment
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      inputToUpdate: opts.inputToUpdate,
      keyName: 'arrowDown',
      modifiers: opts.modifiers,
      expectedInputValuesAfterKeyUp: [{
        input: opts.inputToUpdate.element,
        description: opts.inputDescription,
        value: expectedValue.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false})
      }],
    });
  }
}