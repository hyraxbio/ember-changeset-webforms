import { visit, click, findAll, typeIn, focus, blur } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import els from './test-selectors';

module('Acceptance | Action handling', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('afterFieldEdit', async function(assert) {
    await visit('/docs/action-handling');
    await typeIn(`${els.afterFieldEditForm} ${els.firstNameField} input`, 'G');
    assert.dom(els.afterFieldEditFeedback).hasText(`The user's full name is "G ". The last updated field was First name. The value of settings.formName is names.`, 'afterFieldEdit runs when user types in an input field.', 'All arguments are correctly sent with the afterFieldEdit action.');
    await typeIn(`${els.afterFieldEditForm} ${els.firstNameField} input`, 'ene');
    assert.dom(els.afterFieldEditFeedback).hasText(`The user's full name is "Gene ". The last updated field was First name. The value of settings.formName is names.`, 'afterFieldEdit runs when user types in an input field.');

  });

  test('afterFieldValidation', async function(assert) {
    await visit('/docs/action-handling');
    await focus(`${els.afterFieldValidationForm} ${els.nameField} input`);
    await blur(`${els.afterFieldValidationForm} ${els.nameField} input`);
    assert.dom(els.afterFieldValidationFeedback).hasText(`The user's name is "". The last validated field was Name. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Name can't be blank] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldValidation action, after blur, where there is one validation error.');
    await typeIn(`${els.afterFieldValidationForm} ${els.nameField} input`, 'Gene Parmesan');
    await blur(`${els.afterFieldValidationForm} ${els.nameField} input`);
    assert.dom(els.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Name. The Name has no validation errors when its value is Gene Parmesan. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldEdit action when field has no validation errors.');
    await focus(`${els.afterFieldValidationForm} ${els.emailField} input`);
    await blur(`${els.afterFieldValidationForm} ${els.emailField} input`);
    assert.dom(els.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Email. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Email can't be blank,Email must be a valid email address] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldValidation action, after blur of the email input, where there are two validation errors.');
    await typeIn(`${els.afterFieldValidationForm} ${els.emailField} input`, 'geeeeeeeene@parmesan.com');
    await blur(`${els.afterFieldValidationForm} ${els.emailField} input`);
    assert.dom(els.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Email. The Email has no validation errors when its value is geeeeeeeene@parmesan.com. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldEdit action when field has no validation errors.');
  });
});
