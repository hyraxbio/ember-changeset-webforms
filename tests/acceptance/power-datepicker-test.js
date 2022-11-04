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

  test('Time controls zzz', async function(assert) {
    await visit('/docs/built-in-fields');
    await clickTrigger(`${dummyEls.powerDatepicker24HourTimeSelect} ${dummyEls.startDateField}`);
    await this.pauseTest();
  }),

  test('AM PM controls', async function(assert) {
    await visit('/docs/built-in-fields');
    await clickTrigger(`${dummyEls.powerDatepicker12HourTimeSelect} ${dummyEls.startDateField}`);
    const dateTimeInput = find(`${dummyEls.powerDatepicker12HourTimeSelect} input.date-select`);
    await focus(dateTimeInput);
    const amPmInput = find(`${dummyEls.powerDatepicker12HourTimeSelect} ${dummyEls.powerDatepickerAmPmInput}`)
    assert.equal(amPmInput.value, 'pm', 'AM/PM input begins with value "pm".');
   
    await check(assert, {
      expectedInputValAfterBlur: 'pm',
      expectedRawDateTimeAFterBlur: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)'
    });

    await check(assert, {
      typeInVal: 'a',
      expectedInputValAfterBlur: 'am',
      expectedRawDateTimeAFterBlur: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)'
    });

    await check(assert, {
      typeInVal: 'p',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      typeInVal: 'am',
      expectedInputValAfterBlur: 'am',
    });

    await check(assert, {
      typeInVal: 'pm',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      typeInVal: 'zzzz',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      keyName: 'arrowUp',
      expectedInputValAfterBlur: 'am',
    });

    await check(assert, {
      keyName: 'arrowDown',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      keyName: 'delete',
      expectedInputValBeforeBlur: '',
      expectedInputValAfterBlur: 'pm',
    });

    await check(assert, {
      keyName: 'backspace',
      expectedInputValBeforeBlur: '',
      expectedInputValAfterBlur: 'pm',
    });
  });
});

async function check(assert, opts, env) {
  const initialFormattedDate = '2022-11-03 2:42:19 pm'; 
  const initialRawDateTime = 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)';
  const { keys } = keyCodesMap;
  const dateTimeInput = find(`${dummyEls.powerDatepicker12HourTimeSelect} input.date-select`);
  const amPmInput = find(`${dummyEls.powerDatepicker12HourTimeSelect} ${dummyEls.powerDatepickerAmPmInput}`);
  const initialDateTime = dateTimeInput.value;
  const initialAmPmInputValue = amPmInput.value;
  const expectedFieldValAfterBlur = opts.expectedInputValAfterBlur === 'am' ? initialFormattedDate.replace('pm', 'am') : initialFormattedDate;
  const expectedRawDateTimeAfterBlur = opts.expectedInputValAfterBlur === 'am' ? initialRawDateTime.replace('14', '02') : initialRawDateTime;
  let assertionPrefix;
  let assertionSuffix;
  await focus(amPmInput);
  if (opts.typeInVal) {
    await typeIn(amPmInput, opts.typeInVal);
    assertionPrefix = `Type in "${opts.typeInVal}"`;
    assertionSuffix = `when ${opts.typeInVal}" was typed into the input.`;
  } else if (opts.keyName) {
    await triggerKeyEvent(amPmInput, "keyup", keys[opts.keyName]);
    assertionPrefix = `Special key "${opts.keyName}"`;
    assertionSuffix = `on key up of "${opts.keyName}" key.`;
  } else {
    assertionPrefix = 'Focus in and blur';
    assertionSuffix = `having done nothing after focus in.`
  }
  if ('expectedInputValBeforeBlur' in opts) {
    assert.equal(amPmInput.value, `${opts.expectedInputValBeforeBlur}`, `[${assertionPrefix}] AM/PM input value updates from [${initialAmPmInputValue} => ${opts.expectedInputValBeforeBlur}] before blur, ${assertionSuffix}`);
  }
  await blur(amPmInput);
  assert.equal(amPmInput.value, `${opts.expectedInputValAfterBlur}`, `[${assertionPrefix}] AM/PM input value updates from [${initialAmPmInputValue} => ${opts.expectedInputValAfterBlur}] after blur, ${assertionSuffix}`);
  assert.equal(dateTimeInput.value, expectedFieldValAfterBlur, `[${assertionPrefix}] Value of formatted date time updates from [${initialDateTime} => ${expectedFieldValAfterBlur}] after blur, ${assertionSuffix}`);
  assert.dom(dummyEls.rawDateTime).hasText(expectedRawDateTimeAfterBlur, `[${assertionPrefix}] Value of raw date time updates from [${initialRawDateTime} => ${expectedRawDateTimeAfterBlur}] after blur, ${assertionSuffix}`);
}