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

module('Acceptance | Checkbox group', function (hooks) {
  setupApplicationTest(hooks);

  test('Basic', async function (assert) {
    await visit('/docs/built-in-fields');
    await click(`${dummyEls.checkboxes1CheckboxOption1} input`);
    assert
      .dom(`${dummyEls.checkboxes1CheckboxOption1} input:checked`)
      .exists('First checkbox is checked after being clicked');
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:checked`).length,
      1,
      'Only one checkbox is checked after first checkbox is clicked.',
    );
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:not(:checked)`).length,
      2,
      'Two checkboxes are not clicked after first checkbox is clicked.',
    );
    await click(`${dummyEls.checkboxes1CheckboxOption2} input`);
    assert
      .dom(`${dummyEls.checkboxes1CheckboxOption2} input:checked`)
      .exists('Second checkbox is checked after being clicked');
    assert
      .dom(`${dummyEls.checkboxes1CheckboxOption1} input:checked`)
      .exists(
        'First checkbox remains checked after second checkbox is clicked',
      );
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:checked`).length,
      2,
      'Two checkboxes are checked after second checkbox is clicked.',
    );
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:not(:checked)`).length,
      1,
      'One checkbox not checked after second checkbox is clicked.',
    );
    await click(`${dummyEls.checkboxes1CheckboxOption3} input`);
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:checked`).length,
      3,
      'Three checkboxes are checked after third checkbox is clicked.',
    );
    assert.equal(
      findAll(`${dummyEls.checkboxGroupExample1} input:not(:checked)`).length,
      0,
      'Zero checkbox not checked after third checkbox is clicked.',
    );
  });
});
