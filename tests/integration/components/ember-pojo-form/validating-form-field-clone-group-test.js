import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember-pojo-form/validating-form-field-clone-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ember-pojo-form/validating-form-field-clone-group}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#ember-pojo-form/validating-form-field-clone-group}}
        template block text
      {{/ember-pojo-form/validating-form-field-clone-group}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
