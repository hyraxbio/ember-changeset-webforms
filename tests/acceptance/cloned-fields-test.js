import { visit, find, click, findAll, typeIn, focus, blur, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import els from './test-selectors';
import cth from './custom-test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Acceptance | Cloned fields', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basics', async function(assert) {
    await visit('/docs/clonable-form-fields');
    await click(els.fireFormAddCloneButton);

    await click(els.fireFormAddCloneButton);

    const clones = findAll(els.clonedFormField);
    assert.equal(clones.length, 2, 'Min clones setting of 2 results in two cloned fields on load.');
    await typeIn(clones[0].querySelector('input'), 'gob');
    await blur(clones[0].querySelector('input'));
    assert.equal(clones[0].querySelectorAll(els.fireFormFieldError).length, 2, 'First clone gets correct validation error messages when user focusses out and clone is empty.');
    assert.ok(clones[0].querySelector(els.fireFormField).classList.contains('invalid'), 'First clone gets class "invalid" when user focusses out and clone is empty.');

    assert.ok(clones[1].querySelectorAll(els.fireFormFieldError).length === 0, 'Second clone is not validated on focus out of first clone.');
    // assert.notOk(clones[1].querySelector(els.fireFormField).classList.contains('invalid'), 'Invalid field without validation event "keyUp" gets class "invalid" on focus out.');  HOW TO SAY CLASSLIST DOES NOT CONTAIN?
    await this.pauseTest();

    await click(els.fireFormAddCloneButton);
    assert.ok(clones[0].querySelectorAll(els.fireFormFieldError).length === 2 && clones[0].querySelector(els.fireFormField).classList.contains('invalid'), 'First clone validation status is not affected by clicking add clone button.');
    assert.notOk(clones[1].querySelector(els.fireFormField).classList.contains('valid'), 'Second clone does not get class "valid" clicking add clone button.');
  });
  
});