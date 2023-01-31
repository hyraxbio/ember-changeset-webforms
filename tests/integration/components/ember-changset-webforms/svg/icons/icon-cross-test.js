import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember-changset-webforms/svg/icons/icon-cross', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ember-changset-webforms/svg/icons/icon-cross}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#ember-changset-webforms/svg/icons/icon-cross}}
        template block text
      {{/ember-changset-webforms/svg/icons/icon-cross}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
