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
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    assert.dom(dummyEls.powerDatepickerAmPmInput).doesNotExist('AM/PM input not shown when HH passed as the hour input format.')
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:42:19.234',
      expectedInputValAfterKeyUp: '2022-11-03 16:42:19.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '16'
      }]
    });


    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:19.234',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:81:19.234',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:19.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:57.234',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:81.234',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.234',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.873',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:57.873',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.873',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '873'
      }]
    });
    
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.873',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.873',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '873'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 16:51:57.888',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:57.88888888888',
      expectedInputValAfterKeyUp: '2022-11-03 16:51:57.888',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
        value: '888'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-12-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-03 16:51:19.234',
      expectedInputValAfterKeyUp: '2022-12-03 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 31 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-31 16:51:19.234',
      expectedInputValAfterKeyUp: '2022-12-31 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2028-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-12-31 16:51:19.234',
      expectedInputValAfterKeyUp: '2028-12-31 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2028-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-02-31 16:51:19.234',
      expectedInputValAfterKeyUp: '2028-12-31 16:51:19.234',
    });
  });

  test('Main input (12 hour format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    assert.dom(dummyEls.powerDatepickerAmPmInput).exists('AM/PM input shown when h passed as the hour input format.')

    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);
    const timeSelectorAmPmInput = find(dummyEls.powerDatepickerAmPmInput);
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 4:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 04:42:19 pm',
      expectedInputValAfterKeyUp: '2022-11-03 4:42:19 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '4'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 2:51:19 pm',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 02:81:19 pm',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:19 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 2:51:57 pm',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 pm',
      inputValuesAfterKeyUp: [{
        input: timeSelectorSecondsInput,
        description: 'Seconds',
        value: '57'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 2:51:57 am',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      inputValuesAfterKeyUp: [{
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      inputValuesAfterKeyUp: [{
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterKeyUp: '2022-11-03 2:51:57 am',
      inputValuesAfterKeyUp: [{
        input: timeSelectorAmPmInput,
        description: 'AM/PM',
        value: 'am'
      }]
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-12-03 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-03 2:51:19 pm',
      expectedInputValAfterKeyUp: '2022-12-03 2:51:19 pm',
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sat Dec 31 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-12-31 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-31 2:51:19 pm',
      expectedInputValAfterKeyUp: '2022-12-31 2:51:19 pm',
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2028-12-31 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-12-31 2:51:19 pm',
      expectedInputValAfterKeyUp: '2028-12-31 2:51:19 pm',
    });
  
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2028-12-31 2:51:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-02-31 2:51:19 pm',
      expectedInputValAfterKeyUp: '2028-12-31 2:51:19 pm',
    });
  });  

  test('Arrow keys - hour controls (24 hours format)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await checkIncrements(assert, {
      iterations: 25,
      element: timeSelectorHourInput,
      parentFieldSelector: parentFieldSelector,
      min: 0,
      max: 23
    });
    await checkIncrements(assert, {
      iterations: 4,
      element: timeSelectorHourInput,
      parentFieldSelector: parentFieldSelector,
      min: 0,
      max: 23,
      modifiers: {
        shiftKey: true
      }
    });
  });

  test('Arrow keys - hour controls (12 hour format) zzz', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await checkIncrements(assert, {
      iterations: 13,
      element: timeSelectorHourInput,
      parentFieldSelector: parentFieldSelector,
      min: 1,
      max: 12,
      digits: 1
    });
    await checkIncrements(assert, {
      iterations: 4,
      element: timeSelectorHourInput,
      parentFieldSelector: parentFieldSelector,
      min: 1,
      max: 12,
      digits: 1,
      modifiers: {
        shiftKey: true
      }
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      keyName: 'arrowUp',
      expectedInputValAfterKeyUp: '2',
    });
  });

  test('Arrow keys - minute controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinuteInput = find(dummyEls.timeSelectorInputMinutes);

    await checkIncrements(assert, {
      iterations: 12,
      element: timeSelectorMinuteInput,
      parentFieldSelector: parentFieldSelector,
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      element: timeSelectorMinuteInput,
      parentFieldSelector: parentFieldSelector,
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
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);

    await checkIncrements(assert, {
      iterations: 12,
      element: timeSelectorSecondsInput,
      parentFieldSelector: parentFieldSelector,
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      element: timeSelectorSecondsInput,
      parentFieldSelector: parentFieldSelector,
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
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await checkIncrements(assert, {
      iterations: 12,
      element: timeSelectorMillisecondsInput,
      parentFieldSelector: parentFieldSelector,
      min: 0,
      max: 999,
      downStart: 10,
      digits: 3,
      upStart: 990
    });
    await checkIncrements(assert, {
      iterations: 8,
      element: timeSelectorMillisecondsInput,
      parentFieldSelector: parentFieldSelector,
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
      element: timeSelectorMillisecondsInput,
      parentFieldSelector: parentFieldSelector,
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
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
// await this.pauseTest();
    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 12:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 12:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '21',
      expectedInputValAfterKeyUp: '12',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 13:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 1:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '-1',
      expectedInputValAfterKeyUp: '1',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 20:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 8:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '8',
      expectedInputValAfterKeyUp: '8',
    });
  });

  test('Typed input - hour controls (24 hour clock)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 23:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 23:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '9999',
      expectedInputValAfterKeyUp: '23',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 00:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 00:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '-1',
      expectedInputValAfterKeyUp: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 21:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 21:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '21',
      expectedInputValAfterKeyUp: '21',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 08:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 08:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '08',
      expectedInputValAfterKeyUp: '08',
    });
  });

  test('Typed input - minute controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:59:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      typeInVal: '9999',
      expectedInputValAfterKeyUp: '59',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:00:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:00:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      fillIn: '-1',
      expectedInputValAfterKeyUp: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:34:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:34:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      typeInVal: '34',
      expectedInputValAfterKeyUp: '34',
    });
  });

  test('Typed input - second controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:59 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:59.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      typeInVal: '9999',
      expectedInputValAfterKeyUp: '59',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:00.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      fillIn: '-1',
      expectedInputValAfterKeyUp: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:34 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:34.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      typeInVal: '34',
      expectedInputValAfterKeyUp: '34',
    });
  });

  test('Typed input - millisecond controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:19.999',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      typeInVal: '9999',
      expectedInputValAfterKeyUp: '999',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:19.000',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      fillIn: '-1',
      expectedInputValAfterKeyUp: '000',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 14:42:19.334',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      typeInVal: '334',
      expectedInputValAfterKeyUp: '334',
    });
  });

  test('AM PM controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker12HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const dateTimeInput = find(`${dummyEls.powerDatepicker12HourTimeSelect} input.date-select`);
    await focus(dateTimeInput);
    const amPmInput = find(`${parentFieldSelector} ${dummyEls.powerDatepickerAmPmInput}`);
    assert.equal(amPmInput.value, 'pm', 'AM/PM input begins with value "pm".');
   
    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      expectedInputValAfterKeyUp: '',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'a',
      expectedInputValAfterKeyUp: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'p',
      expectedInputValAfterKeyUp: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'am',
      expectedInputValAfterKeyUp: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'pm',
      expectedInputValAfterKeyUp: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'zzzz',
      expectedInputValAfterKeyUp: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'arrowUp',
      expectedInputValAfterKeyUp: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'arrowDown',
      expectedInputValAfterKeyUp: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'delete',
      expectedInputValAfterKeyUp: '',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterKeyUp: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedDatetimeInputValAfterKeyUp: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'backspace',
      expectedInputValAfterKeyUp: '',
      expectedInputValAfterBlur: 'pm',
    });
  });

  test('Millisecond digits', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepickerUnusualFormat;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);
    const dateTimeInput = find(`${dummyEls.powerDatepickerUnusualFormat} input.date-select`);
    assert.equal(dateTimeInput.value, '03/11/2022 14:42:19.142', 'Fractional seconds in the date time input are trimmed to 3 decimals where format and passed data specifies more than 3 decimals');
    await focus(dateTimeInput);
    assert.equal(timeSelectorMillisecondsInput.value, '142', 'Milliseconds input forced top 3 digits where format for milliseconds input specifies less than 3 digits.');
  });

  test('Display date format differs from date format', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepickerUnusualFormat;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const dateTimeInput = find(`${dummyEls.powerDatepickerUnusualFormat} input.date-select`);
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
      expectedDatetimeInputValAfterKeyUp: '03/11/2022 14:59:19.142',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      typeInVal: '59',
      expectedInputValAfterKeyUp: '59',
    });
    // await this.pauseTest();
  });
});

async function check(assert, opts) {
  const { keys } = keyCodesMap;
  const dateTimeInput = find(`${opts.parentFieldSelector} input.date-select`);
  const initialDateTime = dateTimeInput.value;
  const initialInputValue = opts.element.value;
  const initialRawDateTime = (find(`${opts.parentFieldSelector} ${dummyEls.rawDateTime}`) || {}).textContent;
  const initialOutputFieldValue = (find(`${opts.parentFieldSelector} ${dummyEls.outputFieldValue}`) || {}).textContent;
  let assertionPrefix;
  await focus(opts.element);
  if (opts.typeInVal) {
    await fillIn(opts.element, '');
    await triggerKeyEvent(opts.element, "keyup", '1');
    await typeIn(opts.element, opts.typeInVal);
    assertionPrefix = `Type in "${opts.typeInVal}"`;
  } else if (opts.fillIn) {
    await fillIn(opts.element, opts.fillIn);
    await triggerKeyEvent(opts.element, "keyup", '1');
    assertionPrefix = `Fill in "${opts.fillIn}"`;
  } else if (opts.keyName) {
    await triggerKeyEvent(opts.element, "keydown", keys[opts.keyName], opts.modifiers);
    await triggerKeyEvent(opts.element, "keyup", keys[opts.keyName], opts.modifiers);
    let keysDescription = '';
    for (const key in opts.modifiers || {}) {
      keysDescription  += `${key.replace('Key', '')} + `;
    }
    keysDescription += opts.keyName;
    assertionPrefix = `Special key "${keysDescription}"`;
  } else {
    assertionPrefix = 'Focus in and blur';
  }

  const valueComparison = (initial, after) => {
    if (initial === after) {
      return `REMAINS ______${initial}`;
    } else {
      return `UPDATES from ______${initial} to ${after}`;
    }
  }

  if (!opts.quiet) {
    if (opts.expectedInputValAfterKeyUp) {
      assert.equal(opts.element.value, opts.expectedInputValAfterKeyUp, `[${assertionPrefix} => keyUp] Input value ${valueComparison(initialInputValue, opts.expectedInputValAfterKeyUp)}`);
    }
    if (opts.expectedDatetimeInputValAfterKeyUp) {
      assert.equal(dateTimeInput.value, opts.expectedDatetimeInputValAfterKeyUp, `[${assertionPrefix} => keyUp] Value of formatted date time ${valueComparison(initialDateTime, opts.expectedDatetimeInputValAfterKeyUp)}`);
    }
    if (opts.expectedRawDateTimeAfterKeyUp) {
      assert.dom(`${opts.parentFieldSelector} ${dummyEls.rawDateTime}`).hasText(opts.expectedRawDateTimeAfterKeyUp, `[${assertionPrefix} => keyUp] Value of raw date time ${valueComparison(initialRawDateTime, opts.expectedRawDateTimeAfterKeyUp)}`);
    }
    if (opts.expectedFieldValueAfterKeyUp) {
      assert.dom(`${opts.parentFieldSelector} ${dummyEls.outputFieldValue}`).hasText(opts.expectedFieldValueAfterKeyUp, `[${assertionPrefix} => keyUp] Value of field ${valueComparison(initialOutputFieldValue, opts.expectedFieldValueAfterKeyUp)}`);
    }
   
    for (const item of opts.inputValuesAfterKeyUp || []) {
      assert.equal(item.input.value, item.value, `[${assertionPrefix} => keyUp] ${item.description} input ${valueComparison(item.initialValue, item.value)}`);
    }
    
    await blur(opts.element);
    if (opts.expectedInputValAfterBlur) {
      assert.equal(opts.element.value, `${opts.expectedInputValAfterBlur}`, `[${assertionPrefix} => blur] Input value ${valueComparison(initialInputValue, opts.expectedInputValAfterBlur)}`);
    }
    if (opts.expectedDatetimeInputValAfterBlur) {
      assert.equal(dateTimeInput.value, `${opts.expectedDatetimeInputValAfterBlur}`, `[${assertionPrefix} => blur] Value of formatted date time ${valueComparison(initialDateTime, opts.expectedDatetimeInputValAfterBlur)}`);
    }
    if (opts.expectedRawDateTimeAfterBlur) {
      assert.dom(`${opts.parentFieldSelector} ${dummyEls.rawDateTime}`).hasText(opts.expectedRawDateTimeAfterBlur, `[${assertionPrefix} => blur] Value of raw date time ${valueComparison(initialRawDateTime, opts.expectedRawDateTimeAfterBlur)}`);
    }
    
  } else {
    assert.equal(opts.element.value, `${opts.expectedInputValAfterKeyUp}`, `[${assertionPrefix} => keyUp] Input value ${valueComparison(initialInputValue, opts.expectedInputValAfterKeyUp)}`);
  }
}

async function checkIncrements(assert, opts) {
  const downStart = opts.downStart;
  const upStart = opts.upStart || '0';
  const digits = opts.digits || 2;

  await fillIn(opts.element, upStart);
  await triggerKeyEvent(opts.element, "keyup", '1');

  const iterations = Array.from({length: opts.iterations}, (_, i) => i + 1);

  let increment = 1;
  if ((opts.modifiers || {}).shiftKey && (opts.modifiers || {}).ctrlKey) {
    increment = 100;
  } else if ((opts.modifiers || {}).shiftKey) {
    increment = 10;
  } 

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.element.value);
    const expectedInputValAfterKeyUp = currentValue + increment > opts.max ? opts.max : currentValue + increment;
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      element: opts.element,
      keyName: 'arrowUp',
      modifiers: opts.modifiers,
      expectedInputValAfterKeyUp: expectedInputValAfterKeyUp.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false}),
      quiet: true
    });
  }

  if (downStart) {
    await fillIn(opts.element, downStart);
    await triggerKeyEvent(opts.element, "keyup", '1');
  }  

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.element.value);
    const expectedInputValAfterKeyUp = currentValue - increment < opts.min ? opts.min : currentValue - increment
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      element: opts.element,
      keyName: 'arrowDown',
      modifiers: opts.modifiers,
      expectedInputValAfterKeyUp: expectedInputValAfterKeyUp.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false}),
      quiet: true
    });
  }
}