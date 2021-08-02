import { visit, click, findAll, find, fillIn, focus, blur } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

module('Acceptance | Cloned fields', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/clonable-form-fields');
    assert.notOk(cth.wasValidated(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})}`), 'Clone is not validated on insert, when insert is a validationEvent, but the clone is empty.');
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.emberChangesetWebformsCloneWrapper}`).exists({ count: 2 }, 'Min clones setting of 2 results in two cloned fields on load.');
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.maxClonesReached}`).doesNotExist('Max clones reached text does not display when the number of clones is below the value of the maxClones setting.');
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.removeClone}`).doesNotExist('None of the clones has a remove clone button when the number of clones is equal to the the minClones setting.');
    await focus(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})} input`);
    await blur(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})} input`);
    assert.ok(cth.failedValidation(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})}`), 'First clone fails validation when user focusses out and clone is empty.');
    assert.notOk(cth.wasValidated(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:1})}`), 'Second clone is not validated on focus out of first clone.');
    await cth.addClone(dummyEls.clonableFieldBasics);
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.emberChangesetWebformsCloneWrapper}`).exists({ count: 3 }, 'A new clone is added after the add clone button os clicked.');
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.removeClone}`).exists({ count: 3 }, 'Each clone gets a remove clone button when the number of clones becomes greater than the minClones setting.');
    assert.ok(cth.failedValidation(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})}`), 'First clone validation status is not affected by clicking add clone button.');
    assert.notOk(find(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:1})}`).classList.contains('valid'), 'Second clone does not get class "valid" clicking add clone button.');
    await click(`${dummyEls.clonableFieldBasics} ${els.emberChangesetWebformsAddCloneButton}`);
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.maxClonesReached}`).hasText('Max clones reached.', 'Max clones reached text displays when the number of clones is equal to the value of the maxClones setting.');
    assert.dom(`${dummyEls.clonableFieldBasics} ${els.emberChangesetWebformsAddCloneButton}`).doesNotExist('Add clone button disappears when maxClones is reached.');
    await fillIn(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:1})} input`, 'lucille@bluthcompany.com');
    await blur(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:1})} input`);
    assert.ok(cth.passedValidation(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:1})}`), 'Second clone gets class "valid" when user focusses out and clone has a valid email.');
    await fillIn(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:2})} input`, 'email');
    await blur(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:2})} input`);
    assert.ok(cth.failedValidation(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:2})}`), 'Third clone gets correct validation error messages when user focusses out and clone has invalid email in the input.');
    await cth.removeClone(`${dummyEls.clonableFieldBasics} ${els.cloneSelector({fieldId:'emails', cloneId:0})}`);
    assert.equal(findAll(els.emberChangesetWebformsCloneWrapper)[0].getAttribute('data-test-id'), 'emails-clone-1-wrapper', 'Second clone correctly becomes first clone, after first clone is removed.');
    assert.equal(findAll(els.emberChangesetWebformsCloneWrapper)[1].getAttribute('data-test-id'), 'emails-clone-2-wrapper',  'Third clone correctly becomes second clone, after first clone is removed.');
  });

  test('With data', async function (assert) {
    await visit('/docs/clonable-form-fields');
    assert.dom(`${dummyEls.clonableFieldWithData} ${els.emberChangesetWebformsCloneWrapper}`).exists({ count: 6 }, 'Where number of items in the data array exceeds max clones, one cloned field is still generated for each item in the data array.');
    assert.ok(cth.allFailedValidation(`${dummyEls.clonableFieldWithData} ${els.emberChangesetWebformsCloneWrapper}`, [0, 1]), 'Invalid clones fail validation on insert, where [insert] is a clone validation method, and uniqueClone validation method works.');
    assert.notOk(cth.wasValidated(`${dummyEls.clonableFieldWithData} ${els.cloneSelector({fieldId:'emails', cloneId:2})}`), 'Empty clone is not validated on insert, where [insert] is a clone validation method.');
    assert.ok(cth.allPassedValidation(`${dummyEls.clonableFieldWithData} ${els.emberChangesetWebformsCloneWrapper}`, [3, 4, 5]), 'Invalid clones pass validation on insert, where [insert] is a clone validation method');
    assert.dom(els.maxClonesReached).exists('Max clones reached text shows on insert.');
    await cth.removeClone(dummyEls.clonableFieldWithData);
    assert.ok(cth.passedValidation(`${dummyEls.clonableFieldWithData} ${els.cloneSelector({fieldId:'emails', cloneId:1})}`), 'Previously validated clone is revalidated after another clone is removed.');
    assert.notOk(cth.wasValidated(`${dummyEls.clonableFieldWithData} ${els.cloneSelector({fieldId:'emails', cloneId:2})}`), 'Previously un-validated clone is not revalidated after another clone is removed.');
    await cth.submitForm(dummyEls.clonableFieldWithData);
    assert.dom(`${dummyEls.cloneGroupEmails} > ${els.emberChangesetWebformsFieldErrors}`).hasText('Too many emails (maximum is 4).', 'Correct error message for the clone group on submit.');
    await cth.removeClone(dummyEls.clonableFieldWithData);
    assert.dom(`${dummyEls.cloneGroupEmails} > ${els.emberChangesetWebformsFieldErrors}`).doesNotExist('Clone group is re-validated after clone is removed');
    assert.dom(els.maxClonesReached).exists('Max clones reached text persists after multiple clone removals, where the existing number of clones is equal to the max allowed.');
    await cth.removeClone(dummyEls.clonableFieldWithData);
    assert.dom(`${dummyEls.clonableFieldWithData} ${els.addClone}`).exists('Add clone button shows after clone removal, where the existing number of clones is less than to the max allowed.');
    assert.dom(`${dummyEls.clonableFieldWithData} ${els.maxClonesReached}`).doesNotExist('Max clones reached text disappears after clone removal, where the existing number of clones is less than to the max allowed.');
  });
});