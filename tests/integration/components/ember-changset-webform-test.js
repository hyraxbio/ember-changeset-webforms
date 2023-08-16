import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  visit,
  click,
  findAll,
  find,
  fillIn,
  focus,
  blur,
  typeIn,
} from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import dummyEls from '../../acceptance/test-selectors';
import hbs from 'htmlbars-inline-precompile';
import _merge from 'lodash/merge';

const formSchema = {
  formSettings: {
    formName: 'test',
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      fieldLabel: 'email',
      defaultValue: 'test@email.com',
    },
  ],
};

const submitActionPromiseResolve = (data) => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

const submitActionPromiseReject = (data) => {
  return new Promise((resolve, reject) => {
    reject(data);
  });
};

const submitActionSyncSuccess = (data) => {
  return true;
};
const submitActionSyncFail = (data) => {
  throw 'Error';
};

module('Integration | Component | changeset-webform', function (hooks) {
  setupRenderingTest(hooks);

  test('Submit without clearing', async function (assert) {
    this.set('submitAction', submitActionSyncSuccess);
    this.dontClearFormSchema = _merge({}, formSchema);

    await render(hbs`<div class="docs-rounded"><div class="docs-p-4"><div>
    <ChangesetWebform @formSchema={{this.dontClearFormSchema}} @submitAction={{action this.submitAction}} />
    </div></div></div>
    `);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      '',
      'Name field empty on insert.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test@email.com',
      'Email field has default value "test@email.com" on insert.'
    );
    await fillIn(`${dummyEls.nameField} input`, 'Test');
    await fillIn(`${dummyEls.emailField} input`, 'test2@email.com');
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      'Test',
      'Name field has value "Test" after editing.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test2@email.com',
      'Email field has updated value "test2@email.com" after editing.'
    );
    // await this.pauseTest();
    await click(dummyEls.cwfSubmitFormButton);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      'Test',
      'Name field is retains updated value "Test" after successful form submission.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test2@email.com',
      'Email field retains updated value "test2@email.com" after successful form submission.'
    );
  });

  test('Submit with clearing, retaining field.defaultValue', async function (assert) {
    this.set('submitAction', submitActionSyncSuccess);
    this.clearWithDefaultsFormSchema = _merge({}, formSchema, {
      formSettings: {
        clearFormAfterSubmit: true,
      },
    });

    await render(hbs`<div class="docs-rounded"><div class="docs-p-4"><div>
    <ChangesetWebform @formSchema={{this.clearWithDefaultsFormSchema}} @submitAction={{action this.submitAction}} />
    </div></div></div>
    `);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      '',
      'Name field empty on insert.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test@email.com',
      'Email field has default value "test@email.com" on insert.'
    );
    await fillIn(`${dummyEls.nameField} input`, 'Test');
    await fillIn(`${dummyEls.emailField} input`, 'test2@email.com');
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      'Test',
      'Name field has value "Test" after editing.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test2@email.com',
      'Email field has updated value "test2@email.com" after editing.'
    );
    await click(dummyEls.cwfSubmitFormButton);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      '',
      'Name field is cleared after successful form submission.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test@email.com',
      'Email field is reset to default "test@email.com" after successful form submission.'
    );
  });
  test('Submit with clearing, suppressing field.defaultValue', async function (assert) {
    this.set('submitAction', submitActionSyncSuccess);
    this.clearWithoutDefaultsFormSchema = _merge({}, formSchema, {
      formSettings: {
        clearFormAfterSubmit: 'suppressDefaultValues',
      },
    });
    await render(hbs`<div class="docs-rounded"><div class="docs-p-4"><div>
    <ChangesetWebform @formSchema={{this.clearWithoutDefaultsFormSchema}} @submitAction={{action this.submitAction}} />
    </div></div></div>
    `);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      '',
      'Name field empty on insert.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test@email.com',
      'Email field has default value "test@email.com" on insert.'
    );
    await fillIn(`${dummyEls.nameField} input`, 'Test');
    await fillIn(`${dummyEls.emailField} input`, 'test2@email.com');
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      'Test',
      'Name field has value "Test" after editing.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      'test2@email.com',
      'Email field has updated value "test2@email.com" after editing.'
    );
    await click(dummyEls.cwfSubmitFormButton);
    assert.equal(
      find(`${dummyEls.nameField} input`).value,
      '',
      'Name field is cleared after successful form submission.'
    );
    assert.equal(
      find(`${dummyEls.emailField} input`).value,
      '',
      'Email field is cleared after successful form submission.'
    );
  });
});
