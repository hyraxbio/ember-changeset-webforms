import { visit, find, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';

module('Acceptance | Clicker', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Default clicker element', async function (assert) {
    await visit('/docs/built-in-fields');
    const el = find(dummyEls.clickerExample1);
    el.scrollIntoView();
    assert
      .dom(`${dummyEls.clickerExample1} ${dummyEls.advancedField}`)
      .doesNotExist('Advanced field not present on load.');
    assert
      .dom(`${dummyEls.clickerExample1} ${dummyEls.cwfClickerElement}`)
      .hasText('Advanced options', 'Clicker button has correct text on load.');
    const clickerEl = find(
      `${dummyEls.clickerExample1} ${dummyEls.cwfClickerElement}`
    );
    assert.ok(
      clickerEl.classList.contains('cwf-clicker'),
      'Clicker button has correct inherited classes classes on load.'
    );
    assert.ok(
      clickerEl.classList.contains('btn-primary') &&
        clickerEl.classList.contains('btn'),
      'Clicker button has correct custom classes on load.'
    );
    await click(`${dummyEls.clickerExample1} ${dummyEls.cwfClickerElement} `);
    assert
      .dom(`${dummyEls.clickerExample1} ${dummyEls.advancedField}`)
      .exists('Advanced field is present after clicking show advanced button.');
    await click(`${dummyEls.clickerExample1} ${dummyEls.cwfClickerElement} `);
    assert
      .dom(`${dummyEls.clickerExample1} ${dummyEls.advancedField}`)
      .doesNotExist(
        'Advanced field is not present after clicking show advanced button again.'
      );
  });

  test('Custom component', async function (assert) {
    await visit('/docs/built-in-fields#clicker-field-basic-usage');
    const el = find(dummyEls.clickerExample2);
    el.scrollIntoView();
    assert
      .dom(`${dummyEls.clickerExample2} ${dummyEls.advancedField}`)
      .doesNotExist('Advanced field not present on load.');
    assert
      .dom(`${dummyEls.clickerExample2} ${dummyEls.cwfClickerElement}`)
      .hasText('Advanced options', 'Clicker button has correct text on load.');
    const clickerEl = find(
      `${dummyEls.clickerExample2} ${dummyEls.cwfClickerElement}`
    );
    assert.ok(
      clickerEl.classList.contains('cwf-clicker'),
      'Clicker button has correct inherited classes on load.'
    );
    assert.ok(
      clickerEl.classList.contains('btn'),
      'Clicker button has correct custom classes on load.'
    );
    assert.ok(
      clickerEl.classList.contains('btn-danger') &&
        'Clicker button has correct classes based on props passed to the custom clicker component.'
    );
    await click(`${dummyEls.clickerExample2} ${dummyEls.cwfClickerElement} `);
    assert
      .dom(`${dummyEls.clickerExample2} ${dummyEls.advancedField}`)
      .exists('Advanced field is present after clicking show advanced button.');
    await click(`${dummyEls.clickerExample2} ${dummyEls.cwfClickerElement} `);
    assert
      .dom(`${dummyEls.clickerExample2} ${dummyEls.advancedField}`)
      .doesNotExist(
        'Advanced field is not present after clicking show advanced button again.'
      );
  });
});
