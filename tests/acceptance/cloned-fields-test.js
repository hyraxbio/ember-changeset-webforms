import { visit, click, findAll, typeIn, focus, blur } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import els from './test-selectors';

module('Acceptance | Cloned fields', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basics', async function(assert) {
    await visit('/docs/clonable-form-fields');
    assert.dom(els.clonedFormField).exists({count: 2}, 'Min clones setting of 2 results in two cloned fields on load.');
    assert.dom(els.maxClonesReached).doesNotExist('Max clones reached text does not display when the number of clones is below the value of the maxClones setting.');
    assert.dom(els.removeClone).doesNotExist({count: 3}, 'None of the clones has a remove clone button when the number of clones is equal to the the minClones setting.');
    await focus(getClones()[0].querySelector('input'));
    await blur(getClones()[0].querySelector('input'));
    assert.equal(getClones()[0].querySelectorAll(els.fireFormFieldError).length, 2, 'First clone gets correct validation error messages when user focusses out and clone is empty.');
    assert.ok(getClones()[0].querySelector(els.fireFormField).classList.contains('invalid'), 'First clone gets class "invalid" when user focusses out and clone is empty.');
    assert.ok(getClones()[1].querySelectorAll(els.fireFormFieldError).length === 0, 'Second clone is not validated on focus out of first clone.');
    await click(els.fireFormAddCloneButton);
    assert.dom(els.clonedFormField).exists({count: 3}, 'A new clone is added after the add clone button os clicked.');
    assert.dom(els.removeClone).exists({count: 3}, 'Each clone gets a remove clone button when the number of clones becomes greater than the minClones setting.');
    assert.ok(getClones()[0].querySelectorAll(els.fireFormFieldError).length === 2 && getClones()[0].querySelector(els.fireFormField).classList.contains('invalid'), 'First clone validation status is not affected by clicking add clone button.');
    assert.notOk(getClones()[1].querySelector(els.fireFormField).classList.contains('valid'), 'Second clone does not get class "valid" clicking add clone button.');
    await click(els.fireFormAddCloneButton);
    assert.dom(els.maxClonesReached).hasText('Max clones reached.', 'Max clones reached text displays when the number of clones is equal to the value of the maxClones setting.');
    assert.dom(els.fireFormAddCloneButton).doesNotExist('Add clone button disappears when maxClones is reached.');
    await typeIn(getClones()[1].querySelector('input'), 'lucille@bluthcompany.com');
    await blur(getClones()[1].querySelector('input'));
    assert.ok(getClones()[1].querySelector(els.fireFormField).classList.contains('valid'), 'Second clone gets class "valid" when user focusses out and clone has a valid email.');
    await typeIn(getClones()[2].querySelector('input'), 'email');
    await blur(getClones()[2].querySelector('input'));
    assert.equal(getClones()[2].querySelectorAll(els.fireFormFieldError).length, 1, 'Third clone gets correct validation error messages when user focusses out and clone has invalid email in the input.');
    await click(getClones()[0].querySelector(els.removeClone));
    assert.ok(getClones()[0].querySelector(els.fireFormField).classList.contains('valid'), 'Second clone correctly becomes first clone, after first clone is removed.');
    assert.equal(getClones()[1].querySelectorAll(els.fireFormFieldError).length, 1, 'Third clone correctly becomes second clone, after first clone is removed.');
  });
});

function getClones() {
  return findAll(els.clonedFormField);
}