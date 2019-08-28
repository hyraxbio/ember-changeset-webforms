import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, focus, blur, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import nameInputRequired from './fixtures/form-fields/required/name-input';

module('Integration | Component | validating-form-field', function(hooks) {
  setupRenderingTest(hooks);

  test('Basic rendering', async function(assert) {
    var fieldSchema = nameInputRequired;
    this.set('fieldSchema', fieldSchema);
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('label').textContent.trim() === 'Name', 'Label renders correctly.');
    assert.ok(this.element.querySelector('input').placeholder === 'Name', 'Placeholder uses label value by default.');
    assert.ok(this.element.querySelector('input'), 'Input is rendered');
    assert.ok(this.element.querySelector('input').type === 'text', 'Input renders as type text if inputType is not specified.');
    
    this.set('fieldSchema.autoFocus', true);
    this.set('fieldSchema.placeholder', 'Enter your name');
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input:focus'), '[Autofocus] Input is correctly auto focused when the "autoFocus" property is true.');

    assert.ok(this.element.querySelector('input').placeholder === 'Enter your name' && this.element.querySelector('label').textContent.trim() === 'Name', 'Custom placeholder renders correctly.');

    this.set('fieldSchema.defaultValue', ' Little Sebastian ');
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('input').value === 'Little Sebastian', 'Default value renders in input, is trimmed by default.');

    this.set('fieldSchema.hideLabel', true);
   
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').value === 'Little Sebastian', 'Values are trimmed by default.');
    assert.notOk(this.element.querySelector('label'), 'Label does not render if "hideLabel" is true.');
    await fillIn(this.element.querySelector('input'), ' Little Sebastian ');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.ok(this.element.querySelector('input').value === ' Little Sebastian ', 'Trimming does not happen on "keyUp".');
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('input').value === 'Little Sebastian', 'Value is trimmed on blur by default.');

    this.set('fieldSchema.notrim', true);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.deepEqual(this.element.querySelector('input').value, ' Little Sebastian ', 'Values are not trimmed on insert when notrim is set to true.');
    
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.deepEqual(this.element.querySelector('input').value, ' Little Sebastian ', 'Values are not trimmed on blur when notrim is set to true.');
    assert.ok(this.element.querySelector('div').classList.contains('required'), 'Required class added to fields with "required" as a validationMenthod.');

    this.set('fieldSchema.inputType', 'number');
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'number', 'Input renders as type number if inputType is "number".');

    this.set('fieldSchema.inputType', 'email');
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'email', 'Input renders as type email if inputType is "email".');

    this.set('fieldSchema.inputType', 'password');
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'password', 'Input renders as type password if inputType is "password".');
   
  });

  test('General validation', async function(assert) {
    var fieldSchema = {
      fieldId: 'testInput',
      label: 'Test Input',
      fieldType: 'input',
      validationRules: [{'validationMethod': 'required'}, {'validationMethod': 'isEmail'}],
      inputType: 'text',
      default: '',
    }

    this.set('fieldSchema', fieldSchema);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.equal(this.element.querySelector('[data-test-id="field-error"]').textContent.trim(), 'This field is required.', 'Correct error message shows on focus out of a required field which is empty.');
    assert.notOk(this.element.querySelector('div').classList.contains('valid'), "Valid class does not display on invalid field.");
    assert.ok(this.element.querySelector('div').classList.contains('invalid'), "Invalid class displays on invalid field.");
    assert.ok(this.element.querySelector('[data-test-id="field-error"] [data-test-id="svg-icon-curved-arrow-right"]'), 'Arrow icon displays with error message.');

    await focus(this.element.querySelector('input'));
    assert.notOk(this.element.querySelector('[data-test-id="field-error"]') || this.element.querySelector('div').classList.contains('invalid') , 'Validation errors and classes are removed on focus in.');

    await fillIn(this.element.querySelector('input'), 'test');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-id="field-error"]') && this.element.querySelector('[data-test-id="field-error"]').textContent.trim() !== 'This field is required.', 'Validation rules are applied in the order that they are passed.');

    this.set('fieldSchema.hideSuccessValidation', true);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await fillIn(this.element.querySelector('input'), 'lil-s@pawnee-gov.com');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('input'));
    assert.notOk(this.element.querySelector('div').classList.contains('valid') || this.element.querySelector('div').classList.contains('invalid'), 'Valid class does not display on valid field where "hideSuccessValidation" is true.');

    await fillIn(this.element.querySelector('input'), 'lil-s');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-id="field-error"]'), 'Validation error shows where validation fails and "hideSuccessValidation" is true.');

    this.set('fieldSchema.hideSuccessValidation', null);
    this.set('fieldSchema.validationRules', [{'validationMethod': 'required', 'errorMessage': 'Custom validation error message.'}]);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.equal(this.element.querySelector('[data-test-id="field-error"]').textContent.trim(), 'Custom validation error message.', 'Custom validation error message displays if passed.');

  });

  test('Custom Validation Events', async function(assert) {
    var fieldSchema = {
      fieldId: 'testInput',
      label: 'Test Input',
      fieldType: 'input',
      validationRules: [{'validationMethod': 'required'}, {'validationMethod': 'isEmail'}],
      inputType: 'text',
      default: '',
    }
    this.set('fieldSchema', fieldSchema);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-id="field-error"]'), 'Validation occurs on focus out, even if "validationEvents" is not part of the field schema.');

    this.set('fieldSchema.validationEvents', ['insert']);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.notOk(this.element.querySelector('[data-test-id="field-error"]'), 'Validation does not occur on insert if default value is null, even if "insert" is passed as a validation event.');

    this.set('fieldSchema.defaultValue', 'Test');
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="field-error"]'), 'Field with "insert" as a validation event validates when inserted with a default value.');

    await fillIn(this.element.querySelector('input'), 'test');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.notOk(this.element.querySelector('[data-test-id="field-error"]'), 'Validation error does not show on keyUp, when keyUp not given as validation event for input, and input value is invalid.');

    this.set('fieldSchema.default', '');
    this.set('fieldSchema.validationEvents', ['keyUp']);
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    assert.notOk(this.element.querySelector('div').classList.contains('valid') || this.element.querySelector('div').classList.contains('invalid'), 'No validation occurs on focus in to a text field.');

    await fillIn(this.element.querySelector('input'), 'test');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.ok(this.element.querySelector('[data-test-id="field-error"]'), 'Validation error shows on keyUp, when keyUp given as validation event for input, and input value is invalid.');
    await fillIn(this.element.querySelector('input'), 'lil-s@pawnee-gov.com');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.ok(this.element.querySelector('div').classList.contains('valid'), "Success validation works on key up.");
    await fillIn(this.element.querySelector('input'), '');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.notOk(this.element.querySelector('[data-test-id="field-error"]'), 'Validation error is removed on keyUp, when keyUp given as validation event for input, and input value is an empty string (When all text in input is backspaced).');
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-id="field-error"]'), 'Validation error on focus out of a field that has keyUp as a validation method, and fails validation.');

  });
});
