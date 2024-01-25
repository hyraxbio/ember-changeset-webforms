import {
  visit,
  focus,
  find,
  blur,
  click,
  findAll,
  typeIn,
  fillIn,
  currentURL,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import dummyEls from './test-selectors';

module('Acceptance | Single checkbox', function (hooks) {
  setupApplicationTest(hooks);

  test('Basic', async function (assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.singleCheckboxBasicUse;
    assert.ok(true);
  });
});
