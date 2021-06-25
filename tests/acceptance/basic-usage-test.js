import { visit, find, click, findAll, typeIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Basic usage', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basic usage', async function(assert) {
    await visit('/docs/basic-usage');
    await this.pauseTest();
    // TESTS TODO
    // Trim works by default on input
  });
});