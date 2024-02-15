import { visit, fillIn, focus, blur, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

module('Acceptance | Custom fields', function (hooks) {
  setupApplicationTest(hooks);

  test('Phone number edited first', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await focus(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    assert.ok(
      cth.failedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field fails validation on focusOutPhoneNumberInput.',
    );
    assert.strictEqual(
      cth
        .fieldErrorText(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`)
        .join('|'),
      `Phone number can't be blank|Country code and number are required`,
      'Correct error message shows for empty code and number on focus out.',
    );
    await fillIn(
      `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 456 7890',
    );
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);

    assert.ok(
      cth.failedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but bthe country code is still empty.',
    );
    assert.strictEqual(
      cth
        .fieldErrorText(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`)
        .join('|'),
      `Country code is required`,
      'Error message updates correctly, showeing the field is revalidated number on focus out, after filling in the phone number input.',
    );
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await selectChoose(
      dummyEls.cwfFieldTypePhoneNumberWithCountryCode,
      'Andorra',
    );
    assert.ok(
      cth.passedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field passes validation when country code is selected, after previously failing validation twice.',
    );
    await fillIn(
      `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 aaaa 4567 890',
    );
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);

    assert.ok(
      cth.failedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but bthe country code is still empty.',
    );
    assert.strictEqual(
      cth
        .fieldErrorText(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`)
        .join('|'),
      `Phone number may only contain numbers and spaces`,
      'Error message updates correctly on focus out, after filling in the phone number input and including disallowed characters',
    );
    await focus(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await assert.notOk(
      cth.wasValidated(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`),
      'Validation is hidden on the field when the phone number input is focussed.',
    );
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await assert.ok(
      cth.wasValidated(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`),
      'Validation is unhidden on the field when the phone number input is blurred.',
    );
  });

  test('Country code edited first', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await selectChoose(
      dummyEls.cwfFieldTypePhoneNumberWithCountryCode,
      'Andorra',
    );
    await assert.notOk(
      cth.wasValidated(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`),
      'Field is not validated when the country code is been selected, but the field has the input has not been interacted with.',
    );
    await fillIn(
      `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 4444 4567 890',
    );
    await blur(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    assert.ok(
      cth.passedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field passes validation when phone number input if blurred, when country code was selected.',
    );
  });

  test('Submit clicked', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await click(els.cwfSubmitButton);
    assert.ok(
      cth.failedValidation(
        `${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      ),
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but bthe country code is still empty.',
    );
    assert.strictEqual(
      cth
        .fieldErrorText(`${dummyEls.cwfFieldTypePhoneNumberWithCountryCode}`)
        .join('|'),
      `Phone number can't be blank|Country code and number are required`,
      'Field fails validation with correct error messages on submit without any interaction with the field.',
    );
  });
});
