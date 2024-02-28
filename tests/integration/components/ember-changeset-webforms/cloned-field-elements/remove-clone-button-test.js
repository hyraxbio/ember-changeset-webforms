import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | ember-changeset-webforms/cloned-field-elements/remove-clone-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(
        hbs`<EmberChangesetWebforms::ClonedFieldElements::RemoveCloneButton />`,
      );

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <EmberChangesetWebforms::ClonedFieldElements::RemoveCloneButton>
        template block text
      </EmberChangesetWebforms::ClonedFieldElements::RemoveCloneButton>
    `);

      assert.dom().hasText('template block text');
    });
  },
);
