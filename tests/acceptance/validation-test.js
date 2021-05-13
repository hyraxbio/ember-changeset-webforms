import { visit, find, click, findAll, typeIn, focus, blur, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import els from './test-selectors';
import cth from './custom-test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Acceptance | Field validation', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Validation events', async function(assert) {
    await visit('/docs/field-validation');
    assert.dom(`${els.nameField} ${els.fireFormFieldErrors}`).doesNotExist('Required but empty field with validation events "keyUp" and "insert" does not have class "invalid" on insert.');
    await focus(`${els.nameField} input`);
    await blur(`${els.nameField} input`);
    assert.dom(`${els.nameField} ${els.fireFormFieldErrors}`).exists('Validation runs on focus out of text input.');
    assert.ok(find(`${els.nameField}`).classList.contains('invalid'), 'Empty name field has class "invalid" after focus out.');
    assert.equal(findAll(`${els.nameField} ${els.fireFormFieldError}`).length, 1, 'One error message shows for empty name field after focus out.');
    assert.equal(findAll(`${els.nameField} ${els.fireFormFieldError}`)[0].textContent, `Name can't be blank`, 'Correct default error message shows for empty name field after focus out.');
    await focus(`${els.nameField} input`);
    assert.ok(find(`${els.nameField}`).classList.contains('invalid'), 'Field with "keyUp" validation event does not lose  class "invalid" when focussed.');
    await typeIn(`${els.nameField} input`, 'T');
    assert.ok(find(`${els.nameField}`).classList.contains('valid'), 'Name field gets class "valid" on keyUp when user types single char.');
    await fillIn(`${els.nameField} input`, '');
    await triggerKeyEvent(find(`${els.nameField} input`), "keyup", 1);
    assert.ok(find(`${els.nameField}`).classList.contains('invalid'), 'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.');
    assert.ok(find(`${els.emailField}`).classList.contains('valid'), 'valid field with "insert" as a validation event has class "valid" on insert.');
    await focus(`${els.emailField} input`);
    assert.notOk(find(`${els.emailField}`).classList.contains('valid'), 'Field without validation event "keyUp" loses class "valid" when focussed.');
    await fillIn(`${els.emailField} input`, 'bluemangroup');
    await blur(`${els.emailField} input`);
    assert.ok(find(`${els.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" gets class "invalid" on focus out.');
    await focus(`${els.emailField} input`);
    assert.notOk(find(`${els.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" loses class "invalid" when focussed.');
    
    await click(`${els.acceptTermsTrueRadioButton} input[type="radio"]`);
    assert.ok(find(`${els.acceptTermsField}`).classList.contains('valid'), 'Validation runs after selecting option in radio button group.');
    await click(`${els.confirmHumanField} input[type="checkbox"]`);
    assert.ok(find(`${els.confirmHumanField}`).classList.contains('valid'), 'Validation runs after checking single checkbox.');
    await selectChoose(find(els.countryField), 'United States');
    assert.ok(find(`${els.countryField}`).classList.contains('valid'), 'Validation runs after selecting power select option.');
    // TODO checkbox group and text area.
  });
  test('Validation messages', async function(assert) {
    await visit('/docs/field-validation');
    await click(els.fireFormSubmitButton);
    assert.equal(findAll(els.fireFormFieldErrors).length, 5, 'All fields with validation rules are validated when user clicks submit button.');
    assert.equal(findAll(`${els.countryField} ${els.fireFormFieldError}`)[0].textContent, `Nation of origin can't be blank`, 'Passing "description" as an argument to validationRules replaces the default validation description ("Details.country) with the description provided.');
    assert.equal(findAll(`${els.acceptTermsField} ${els.fireFormFieldError}`)[0].textContent, 'You must accept the terms to continue.', 'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.');
    await fillIn(`${els.emailField} input`, '');
    await blur(`${els.emailField} input`);
    assert.equal(findAll(`${els.emailField} ${els.fireFormFieldError}`).length, 2, 'Multiple errors display where multiple exist.');
  });

  test('Custom validators', async function(assert) {
    await visit('/docs/integrating-custom-validators');
    await click(els.fireFormSubmitButton);
    assert.equal(cth.textContentArray(findAll(els.fireFormFieldError)).join('|'), 'Each field must be unique- primary email is the same as recovery email.|Each field must be unique- recovery email is the same as primary email.', 'Custom validator is applied correctly.');
  });
  
});