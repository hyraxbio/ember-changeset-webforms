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
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';

module('Acceptance | Single checkbox', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basic', async function (assert) {
    await visit('/docs/built-in-fields');
    const parentFieldSelector = dummyEls.singleCheckboxBasicUse;
    assert.ok(true);
  });
});
