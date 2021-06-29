import { visit, find, click, findAll, typeIn, focus, blur, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Acceptance | Field validation', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Validation events', async function(assert) {
    await visit('/docs/field-validation');
    assert.dom(`${dummyEls.nameField} ${els.emberChangesetWebformsFieldErrors}`).doesNotExist('Required but empty field with validation events "keyUp" and "insert" does not have validation error messages on insert.');
    assert.notOk(find(`${dummyEls.nameField}`).classList.contains('invalid'), 'Required but empty field with validation events "keyUp" and "insert" does not have class "invalid" on insert.');
    assert.notOk(find(`${dummyEls.nameField}`).classList.contains('valid'), 'Required but empty field with validation events "keyUp" and "insert" does not have class "valid" on insert.');
    assert.ok(find(`${dummyEls.emailField}`).classList.contains('valid'), 'Valid field with validation event "insert" has class "valid" on insert.');
    assert.dom(`${dummyEls.recoveryEmailField} ${els.emberChangesetWebformsFieldErrors}`).exists('Invalid field with validation event "insert" has validation error messages on insert.');
    assert.ok(find(`${dummyEls.recoveryEmailField}`).classList.contains('invalid'), 'Invalid field with validation event "insert" has class "invalid" on insert.');
    await focus(`${dummyEls.nameField} input`);
    await blur(`${dummyEls.nameField} input`);
    assert.dom(`${dummyEls.nameField} ${els.emberChangesetWebformsFieldErrors}`).exists('Validation runs on focus out of text input.');
    assert.ok(find(`${dummyEls.nameField}`).classList.contains('invalid'), 'Empty name field has class "invalid" after focus out.');
    assert.equal(findAll(`${dummyEls.nameField} ${els.emberChangesetWebformsFieldError}`).length, 1, 'One error message shows for empty name field after focus out.');
    assert.equal(findAll(`${dummyEls.nameField} ${els.emberChangesetWebformsFieldError}`)[0].textContent, `Name can't be blank`, 'Correct default error message shows for empty name field after focus out.');
    await focus(`${dummyEls.nameField} input`);
    assert.ok(find(`${dummyEls.nameField}`).classList.contains('invalid'), 'Field with "keyUp" validation event does not lose  class "invalid" when focussed.');
    await typeIn(`${dummyEls.nameField} input`, 'T');
    assert.ok(find(`${dummyEls.nameField}`).classList.contains('valid'), 'Name field gets class "valid" on keyUp when user types single char.');
    await fillIn(`${dummyEls.nameField} input`, '');
    await triggerKeyEvent(find(`${dummyEls.nameField} input`), "keyup", 1);
    assert.ok(find(`${dummyEls.nameField}`).classList.contains('invalid'), 'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.');
    assert.ok(find(`${dummyEls.emailField}`).classList.contains('valid'), 'valid field with "insert" as a validation event has class "valid" on insert.');
    await focus(`${dummyEls.emailField} input`);
    assert.notOk(find(`${dummyEls.emailField}`).classList.contains('valid'), 'Field without validation event "keyUp" loses class "valid" when focussed.');
    await fillIn(`${dummyEls.emailField} input`, 'bluemangroup');
    await blur(`${dummyEls.emailField} input`);
    assert.ok(find(`${dummyEls.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" gets class "invalid" on focus out.');
    await focus(`${dummyEls.emailField} input`);
    assert.notOk(find(`${dummyEls.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" loses class "invalid" when focussed.');
    await click(`${dummyEls.acceptTermsTrueRadioButton} input[type="radio"]`);
    assert.ok(find(`${dummyEls.acceptTermsField}`).classList.contains('valid'), 'Validation runs after selecting option in radio button group.');
    await click(`${dummyEls.confirmHumanField} input[type="checkbox"]`);
    assert.ok(find(`${dummyEls.confirmHumanField}`).classList.contains('valid'), 'Validation runs after checking single checkbox.');
    await selectChoose(find(dummyEls.countryField), 'United States');
    assert.ok(find(`${dummyEls.countryField}`).classList.contains('valid'), 'Validation runs after selecting power select option.');
    // TODO checkbox group and text area.
  });
  test('Validation messages', async function(assert) {
    await visit('/docs/field-validation');
    await click(els.emberChangesetWebformsSubmitButton);
    assert.equal(findAll(els.emberChangesetWebformsFieldErrors).length, 6, 'All fields with validation rules are validated when user clicks submit button.');
    assert.equal(findAll(`${dummyEls.countryField} ${els.emberChangesetWebformsFieldError}`)[0].textContent, `Nation of origin can't be blank`, 'Passing "description" as an argument to validationRules replaces the default validation description ("Details.country) with the description provided.');
    assert.equal(findAll(`${dummyEls.acceptTermsField} ${els.emberChangesetWebformsFieldError}`)[0].textContent, 'You must accept the terms to continue.', 'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.');
    await fillIn(`${dummyEls.emailField} input`, '');
    await blur(`${dummyEls.emailField} input`);
    assert.equal(findAll(`${dummyEls.emailField} ${els.emberChangesetWebformsFieldError}`).length, 2, 'Multiple errors display where multiple exist.');
  });

  test('Custom validators', async function(assert) {
    await visit('/docs/integrating-custom-validators');
    await click(els.emberChangesetWebformsSubmitButton);
    const fields = findAll(`${dummyEls.integratingCustomValidatorsForm} ${els.emberChangesetWebformsField}`);
    assert.equal(cth.fieldErrorText(fields[0]).concat(cth.fieldErrorText(fields[1])).join('|'), 'Each field must be unique- primary email is the same as recovery email.|Each field must be unique- recovery email is the same as primary email.', 'Custom validator is applied correctly.');
  });
  
  // TODO - validation of all fields on submit, and ignores hidden fields.

});