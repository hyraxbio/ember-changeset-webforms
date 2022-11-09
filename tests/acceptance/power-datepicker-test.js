import { visit, focus, find, blur, click, findAll, typeIn, fillIn, currentURL, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';
import keyCodesMap from 'ember-changeset-webforms/utils/keycodes-map';

module('Acceptance | Power datepicker field', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Main input (24 hour format) zzz', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const dateTimeInput = find(`${parentFieldSelector} input.date-select`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);
    
    // await fillIn(dateTimeInput, '2022-11-03 16:42:19.234');    
    // await triggerKeyEvent(dateTimeInput, "keyup", '1');
    // await blur(dateTimeInput);

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 16:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:42:19.234',
      expectedInputValAfterBlur: '2022-11-03 16:42:19.234',
      inputValuesAfterBlur: [{
        input: timeSelectorHourInput,
        description: 'Hours',
        value: '16'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:51:19.234',
      expectedInputValAfterBlur: '2022-11-03 16:51:19.234',
      inputValuesAfterBlur: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-11-03 16:81:19.234',
      expectedInputValAfterBlur: '2022-11-03 16:51:19.234',
      inputValuesAfterBlur: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: 'trash',
      expectedInputValAfterBlur: '2022-11-03 16:51:19.234',
      inputValuesAfterBlur: [{
        input: timeSelectorMinutesInput,
        description: 'Minutes',
        value: '51'
      }]
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Sat Dec 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-12-03 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-03 16:51:19.234',
      expectedInputValAfterBlur: '2022-12-03 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Sat Dec 31 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2022-12-31 16:51:19.234',
      expectedInputValAfterBlur: '2022-12-31 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2028-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-12-31 16:51:19.234',
      expectedInputValAfterBlur: '2028-12-31 16:51:19.234',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2028-12-31 16:51:19.234',
      parentFieldSelector: parentFieldSelector,
      element: dateTimeInput,
      fillIn: '2028-02-31 16:51:19.234',
      expectedInputValAfterBlur: '2028-12-31 16:51:19.234',
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

  test('Arrow keys - hour controls (12 hour format)', async function(assert) {
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

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 12:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 12:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '21',
      expectedInputValAfterBlur: '12',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 13:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 1:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '-1',
      expectedInputValAfterBlur: '1',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 20:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 8:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '8',
      expectedInputValAfterBlur: '8',
    });
  });

  test('Typed input - hour controls (24 hour clock)', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorHourInput = find(dummyEls.timeSelectorInputHour);

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 23:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 23:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '9999',
      expectedInputValAfterBlur: '23',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 00:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 00:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      fillIn: '-1',
      expectedInputValAfterBlur: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 21:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 21:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '21',
      expectedInputValAfterBlur: '21',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 08:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 08:42:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorHourInput,
      typeInVal: '08',
      expectedInputValAfterBlur: '08',
    });
  });

  test('Typed input - minute controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMinutesInput = find(dummyEls.timeSelectorInputMinutes);

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:59:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      typeInVal: '9999',
      expectedInputValAfterBlur: '59',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:00:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:00:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      fillIn: '-1',
      expectedInputValAfterBlur: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:34:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:34:19.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMinutesInput,
      typeInVal: '34',
      expectedInputValAfterBlur: '34',
    });
  });

  test('Typed input - second controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorSecondsInput = find(dummyEls.timeSelectorInputSeconds);

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:59 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:59.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      typeInVal: '9999',
      expectedInputValAfterBlur: '59',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:00.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      fillIn: '-1',
      expectedInputValAfterBlur: '00',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:34 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:34.234',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorSecondsInput,
      typeInVal: '34',
      expectedInputValAfterBlur: '34',
    });
  });

  test('Typed input - millisecond controls', async function(assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${dummyEls.startDateField}`);
    const timeSelectorMillisecondsInput = find(dummyEls.timeSelectorInputMilliseconds);

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:19.999',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      typeInVal: '9999',
      expectedInputValAfterBlur: '999',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:19.000',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      fillIn: '-1',
      expectedInputValAfterBlur: '000',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 14:42:19.334',
      parentFieldSelector: parentFieldSelector,
      element: timeSelectorMillisecondsInput,
      typeInVal: '334',
      expectedInputValAfterBlur: '334',
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
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'a',
      expectedInputValAfterBlur: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'p',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'am',
      expectedInputValAfterBlur: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'pm',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      typeInVal: 'zzzz',
      expectedInputValAfterBlur: 'pm',
    });
    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 am',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'arrowUp',
      expectedInputValAfterBlur: 'am',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'arrowDown',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'delete',
      expectedInputValBeforeBlur: '',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      expectedFieldValAfterBlur: '2022-11-03 2:42:19 pm',
      parentFieldSelector: parentFieldSelector,
      element: amPmInput,
      keyName: 'backspace',
      expectedInputValBeforeBlur: '',
      expectedInputValAfterBlur: 'pm',
    });
  });
});

async function check(assert, opts) {
  const { keys } = keyCodesMap;
  const dateTimeInput = find(`${opts.parentFieldSelector} input.date-select`);
  const initialDateTime = dateTimeInput.value;
  const initialInputValue = opts.element.value;
  const initialRawDateTime = find(dummyEls.rawDateTime).textContent;
  const inputValuesAfterBlur = (opts.inputValuesAfterBlur || []).map(item => {
    item.initialValue = item.input.value;
  })
  let assertionPrefix;
  let assertionSuffix;
  await focus(opts.element);
  if (opts.typeInVal) {
    await fillIn(opts.element, '');
    await triggerKeyEvent(opts.element, "keyup", '1');
    await typeIn(opts.element, opts.typeInVal);
    assertionPrefix = `Type in "${opts.typeInVal}"`;
    assertionSuffix = `when ${opts.typeInVal}" was typed into the input.`;
  } else if (opts.fillIn) {
    await fillIn(opts.element, opts.fillIn);
    await triggerKeyEvent(opts.element, "keyup", '1');
    assertionPrefix = `Fill in "${opts.fillIn}"`;
    assertionSuffix = `when ${opts.fillIn}" was filled into the input.`;
  } else if (opts.keyName) {
    await triggerKeyEvent(opts.element, "keydown", keys[opts.keyName], opts.modifiers);
    await triggerKeyEvent(opts.element, "keyup", keys[opts.keyName], opts.modifiers);
    let keysDescription = '';
    for (const key in opts.modifiers || {}) {
      keysDescription  += `${key.replace('Key', '')} + `;
    }
    keysDescription += opts.keyName;
    assertionPrefix = `Special key "${keysDescription}"`;
    assertionSuffix = `on key down of "${keysDescription}" key.`;
  } else {
    assertionPrefix = 'Focus in and blur';
    assertionSuffix = `having done nothing after focus in.`
  }

  if (!opts.quiet) {
    if ('expectedInputValBeforeBlur' in opts) {
      assert.equal(opts.element.value, `${opts.expectedInputValBeforeBlur}`, `[${assertionPrefix}] AM/PM input value updates from [${initialInputValue} => ${opts.expectedInputValBeforeBlur}] before blur, ${assertionSuffix}`);
    }
  
    await blur(opts.element);
    assert.equal(opts.element.value, `${opts.expectedInputValAfterBlur}`, `[${assertionPrefix}] Input value updates from [${initialInputValue} => ${opts.expectedInputValAfterBlur}] after blur, ${assertionSuffix}`);
    
    
    assert.equal(dateTimeInput.value, opts.expectedFieldValAfterBlur, `[${assertionPrefix}] Value of formatted date time updates from [${initialDateTime} => ${opts.expectedFieldValAfterBlur}] after blur, ${assertionSuffix}`);
    
    assert.dom(dummyEls.rawDateTime).hasText(opts.expectedRawDateTimeAfterBlur, `[${assertionPrefix}] Value of raw date time updates from [${initialRawDateTime} => ${opts.expectedRawDateTimeAfterBlur}] after blur, ${assertionSuffix}`);
    
    for (const item of opts.inputValuesAfterBlur || []) {
      assert.equal(item.input.value, item.value, `[${assertionPrefix}] ${item.description} input updates from [${item.initialValue}] => [${item.value}] after blur, ${assertionSuffix}.`);
    }
    
  } else {
    assert.equal(opts.element.value, `${opts.expectedInputValAfterBlur}`, `[${assertionPrefix}] Input value updates from [${initialInputValue} => ${opts.expectedInputValAfterBlur}] after blur, ${assertionSuffix}`);
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
    const expectedInputValAfterBlur = currentValue + increment > opts.max ? opts.max : currentValue + increment;
    await check(assert, {
      // expectedFieldValAfterBlur: '2022-11-03 16:42:19.234',
      parentFieldSelector: opts.parentFieldSelector,
      element: opts.element,
      keyName: 'arrowUp',
      modifiers: opts.modifiers,
      expectedInputValAfterBlur: expectedInputValAfterBlur.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false}),
      quiet: true
    });
  }

  if (downStart) {
    await fillIn(opts.element, downStart);
    await triggerKeyEvent(opts.element, "keyup", '1');
  }  

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.element.value);
    const expectedInputValAfterBlur = currentValue - increment < opts.min ? opts.min : currentValue - increment
    await check(assert, {
      // expectedFieldValAfterBlur: '2022-11-03 16:42:19.234',
      parentFieldSelector: opts.parentFieldSelector,
      element: opts.element,
      keyName: 'arrowDown',
      modifiers: opts.modifiers,
      expectedInputValAfterBlur: expectedInputValAfterBlur.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false}),
      quiet: true
    });
  }
}