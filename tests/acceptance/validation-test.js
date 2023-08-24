import { visit, find, click, findAll, focus, blur, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Acceptance | Field validation', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Validation events', async function (assert) {
    await visit('/docs/field-validation');
    assert.notOk(cth.wasValidated(`${dummyEls.nameField}`), 'Field with validation event "insert" is not validated when empty on insert.');
    assert.ok(cth.failedValidation(`${dummyEls.recoveryEmailField}`), 'Invalid field with validation event "insert" fails validation insert.');
    await focus(`${dummyEls.nameField} input`);
    assert.notOk(cth.wasValidated(`${dummyEls.nameField}`), 'Field without validation event "keyUp" loses validation when focussed.');
    await blur(`${dummyEls.nameField} input`);
    assert.equal(cth.fieldErrorText(`${dummyEls.nameField}`).join(''), `Name can't be blank`, 'Correct default error message shows for empty name field after focus out.');
    await focus(`${dummyEls.nameField} input`);
    assert.ok(cth.failedValidation(`${dummyEls.nameField}`), 'Field with "keyUp" validation event does not lose  class "invalid" when focussed.');
    await fillIn(`${dummyEls.nameField} input`, 'T');
    await triggerKeyEvent(find(`${dummyEls.nameField} input`), 'keyup', 1);
    assert.ok(cth.passedValidation(`${dummyEls.nameField}`), 'Field with "keyUp" validation event passes validation on keyUp when user types single char.');
    await fillIn(`${dummyEls.nameField} input`, '');
    await triggerKeyEvent(find(`${dummyEls.nameField} input`), 'keyup', 1);
    assert.ok(cth.failedValidation(`${dummyEls.nameField}`), 'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.');
    assert.ok(cth.passedValidation(`${dummyEls.emailField}`), 'Valid field with validation event "insert" passes validation on insert.');
    await fillIn(`${dummyEls.emailField} input`, 'bluemangroup');
    await blur(`${dummyEls.emailField} input`);
    await focus(`${dummyEls.passwordField} input`);
    await blur(`${dummyEls.passwordField} input`);
    assert.ok(cth.wasValidated(`${dummyEls.passwordField}`), 'Validation runs on focus out of input field by default.');
    await click(`${dummyEls.acceptTermsTrueRadioButton} input[type="radio"]`);
    assert.ok(cth.passedValidation(`${dummyEls.acceptTermsField}`), 'Validation runs after selecting option in radio button group.');
    await click(`${dummyEls.confirmHumanField} input[type="checkbox"]`);
    assert.ok(cth.passedValidation(`${dummyEls.confirmHumanField}`), 'Validation runs after checking single checkbox.');
    await click('.ember-basic-dropdown-trigger');
    await selectChoose(find(dummyEls.countryField), 'United States');
    assert.ok(cth.passedValidation(`${dummyEls.countryField}`), 'Validation runs after selecting power select option.');
    // TODO checkbox group and text area.
  });

  test('Validation messages', async function (assert) {
    await visit('/docs/field-validation');
    await click(els.cwfSubmitButton);
    assert.equal(findAll(els.cwfFieldErrors).length, 8, 'All fields with validation rules are validated when user clicks submit button.');
    assert.equal(cth.fieldErrorText(dummyEls.countryField).join(''), `Nation of origin can't be blank`, 'Passing "description" as an argument to validationRules replaces the default validation description ("Details.country) with the description provided.');
    assert.equal(cth.fieldErrorText(dummyEls.acceptTermsField).join(''), 'You must accept the terms to continue.', 'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.');
    await fillIn(`${dummyEls.emailField} input`, '');
    await blur(`${dummyEls.emailField} input`);
    assert.equal(findAll(`${dummyEls.emailField} ${els.cwfFieldError}`).length, 2, 'Multiple errors display where multiple exist.');
  });

  test('Custom validators', async function (assert) {
    await visit('/docs/integrating-custom-validators');
    await click(els.cwfSubmitButton);
    const fields = findAll(`${dummyEls.integratingCustomValidatorsForm} ${els.cwfField}`);
    assert.equal(cth.fieldErrorText(fields[0]).concat(cth.fieldErrorText(fields[1])).join('|'), 'Each field must be unique- primary email is the same as recovery email.|Each field must be unique- recovery email is the same as primary email.', 'Custom validator is applied correctly.');
  });

  // TODO - validation of all fields on submit, and ignores hidden fields.
});
