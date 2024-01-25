import {
  visit,
  find,
  click,
  findAll,
  typeIn,
  currentURL,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Basic usage', function (hooks) {
  setupApplicationTest(hooks);

  test('Basic usage', async function (assert) {
    await visit('/docs/basic-usage');
    assert.equal(currentURL(), '/docs/basic-usage');
    // TESTS TODO
    // Trim works by default on input
  });
});
