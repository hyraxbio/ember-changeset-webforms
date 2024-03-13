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
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

module('Acceptance | Cloned fields', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/clonable-form-fields');
    assert.notOk(
      await cth.wasValidated(
        '[data-test-id="add-emails-form-emails-field-clone-0"]',
      ),
      'Clone is not validated on insert, when insert is a validationEvent, but the clone is empty.',
    );
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 2 },
        'Min clones setting of 2 results in two cloned fields on load.',
      );

    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfMaxClonesReached}`)
      .doesNotExist(
        'Max clones reached text does not display when the number of clones is below the value of the maxClones setting.',
      );
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfRemoveClone}`)
      .doesNotExist(
        'None of the clones has a remove clone button when the number of clones is equal to the the minClones setting.',
      );

    await focus(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-0"] input`,
    );

    await blur(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-0"] input`,
    );
    await cth.failedValidation(
      `[data-test-id="add-emails-form-emails-field-clone-0"]`,
      assert,
      {
        assertionSuffix:
          'First clone fails validation when user focusses out and clone is empty.',
      },
    );
    assert.notOk(
      await cth.wasValidated(
        `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      ),
      'Second clone is not validated on focus out of first clone.',
    );
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfAddClone}`)
      .hasText(
        'Add email address',
        'Add clone button reflects custom cloneButtonText when passed to the field definition.',
      );
    await cth.addClone(dummyEls.clonableFieldBasics);
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 3 },
        'A new clone is added after the add clone button is clicked.',
      );
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfRemoveClone}`)
      .exists(
        { count: 3 },
        'Each clone gets a remove clone button when the number of clones becomes greater than the minClones setting.',
      );
    await cth.failedValidation(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-0"]`,
      assert,
      {
        assertionSuffix:
          'First clone validation status is not affected by clicking add clone button.',
      },
    );
    assert.notOk(
      find(
        `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      ).classList.contains('valid'),
      'Second clone does not get class "valid" clicking add clone button.',
    );
    await click(`${dummyEls.clonableFieldBasics} ${els.cwfAddClone}`);
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfMaxClonesReached}`)
      .hasText(
        'Max clones reached.',
        'Max clones reached text displays when the number of clones is equal to the value of the maxClones setting.',
      );
    assert
      .dom(`${dummyEls.clonableFieldBasics} ${els.cwfAddClone}`)
      .doesNotExist('Add clone button disappears when maxClones is reached.');
    await fillIn(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"] input`,
      'lucille@bluthcompany.com',
    );
    await blur(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"] input`,
    );
    await cth.passedValidation(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      assert,
      {
        assertionSuffix:
          'Second clone gets class "is-valid" when user focusses out and clone has a valid email.',
      },
    );
    await fillIn(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"] input`,
      'email',
    );
    await blur(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"] input`,
    );
    await cth.failedValidation(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      assert,
      {
        assertionSuffix:
          'Third clone gets correct validation error messages when user focusses out and clone has invalid emailin the input.',
      },
    );

    await cth.removeClone(
      `${dummyEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-0"]`,
    );
    assert.strictEqual(
      findAll(els.cwfCloneWrapper)[0].getAttribute('data-test-id'),
      'add-emails-form-emails-field-clone-1',
      'Second clone correctly becomes first clone, after first clone is removed.',
    );
    assert.strictEqual(
      findAll(els.cwfCloneWrapper)[1].getAttribute('data-test-id'),
      'add-emails-form-emails-field-clone-2',
      'Third clone correctly becomes second clone, after first clone is removed.',
    );
  });

  test('With data', async function (assert) {
    await visit('/docs/clonable-form-fields');
    assert
      .dom(`${dummyEls.clonableFieldWithData} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 6 },
        'Where number of items in the data array exceeds max clones, one cloned field is still generated for each item in the data array.',
      );
    assert.ok(
      await cth.allFailedValidation(
        `${dummyEls.clonableFieldWithData} ${els.cwfCloneWrapper}`,
        [0, 1],
      ),
      '1) Invalid clones fail validation on insert, where [insert] is a clone validation method. 2) The uniqueClone validation method works.',
    );
    assert.notOk(
      await cth.wasValidated(
        `${dummyEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      ),
      'Empty clone is not validated on insert, where [insert] is a clone validation method.',
    );
    assert.ok(
      await cth.allPassedValidation(
        `${dummyEls.clonableFieldWithData} ${els.cwfCloneWrapper}`,
        [3, 4, 5],
      ),
      'Valid clones pass validation on insert, where [insert] is a clone validation method',
    );
    assert
      .dom(els.cwfMaxClonesReached)
      .exists('Max clones reached text shows on insert.');
    await cth.removeClone(dummyEls.clonableFieldWithData);
    await cth.passedValidation(
      `${dummyEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      assert,
      {
        assertionSuffix:
          'Previously validated clone is revalidated after another clone is removed.',
      },
    );
    assert.notOk(
      await cth.wasValidated(
        `${dummyEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      ),
      'Previously un-validated clone is not revalidated after another clone is removed.',
    );
    await cth.submitForm(dummyEls.clonableFieldWithData);
    assert
      .dom(`${dummyEls.cloneGroupEmails} > ${els.cwfFieldErrors}`)
      .hasText(
        'Too many emails (maximum is 4).',
        'Correct error message for the clone group on submit.',
      );
    await cth.removeClone(dummyEls.clonableFieldWithData);
    assert
      .dom(`${dummyEls.cloneGroupEmails} > ${els.cwfFieldErrors}`)
      .doesNotExist('Clone group is re-validated after clone is removed');
    assert
      .dom(els.cwfMaxClonesReached)
      .exists(
        'Max clones reached text persists after multiple clone removals, where the existing number of clones is equal to the max allowed.',
      );
    await cth.removeClone(dummyEls.clonableFieldWithData);
    assert
      .dom(`${dummyEls.clonableFieldWithData} ${els.cwfAddClone}`)
      .exists(
        'Add clone button shows after clone removal, where the existing number of clones is less than to the max allowed.',
      );
    assert
      .dom(`${dummyEls.clonableFieldWithData} ${els.cwfMaxClonesReached}`)
      .doesNotExist(
        'Max clones reached text disappears after clone removal, where the existing number of clones is less than to the max allowed.',
      );
  });

  test('When validation is shown when focussed', async function (assert) {
    await visit('/misc');
    assert
      .dom(`${dummyEls.clonableFieldCountries} ${els.cwfCloneWrapper}`)
      .exists({ count: 2 }, '2 clones exist on load.');
    const firstCloneSelector = `${dummyEls.clonableFieldCountries} [data-test-id="country-iso-codes-form-country-codes-field-clone-0"]`;

    const firstCloneInputSelector = `${firstCloneSelector} input`;
    const secondCloneSelector = `${dummyEls.clonableFieldCountries} [data-test-id="country-iso-codes-form-country-codes-field-clone-1"]`;
    await typeIn(firstCloneInputSelector, 'ZAFs');
    await cth.failedValidation(firstCloneSelector, assert, {
      assertionSuffix:
        'First clone fails validation when user types a fourth character.',
    });
    assert.notOk(
      await cth.wasValidated(secondCloneSelector),
      'Second clone is not validated on keyUp in the input of the first clone.',
    );
    assert
      .dom(`${dummyEls.clonableFieldCountries} ${els.cwfAddClone}`)
      .hasText(
        'Add Country code field',
        'Add clone button is present and has correct default text when minClones is specified, but maxClones is not.',
      );
  });
});
