import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  fillIn,
  focus,
  blur,
  triggerKeyEvent,
  clearRender
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import nameInputRequired from './fixtures/form-fields/required/name-input';
import emailInputRequired from './fixtures/form-fields/required/email-input';

module('Integration | Component | validating-form-field', function(hooks) {
  setupRenderingTest(hooks);

  test('Basic rendering', async function(assert) {
    this.set('fieldSchema', {
      fieldLabel: 'Name',
      fieldId: 'name',
      fieldType: 'input',
      inputType: 'text'
    });
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('label').textContent.trim() === 'Name', 'Label renders correctly.');
    assert.ok(this.element.querySelector('input').placeholder === 'Name', 'Placeholder uses label value by default.');
    assert.ok(this.element.querySelector('input'), 'Input is rendered');
    assert.ok(this.element.querySelector('input').type === 'text', 'Input renders as type text if inputType is not specified.');
    
    this.set('fieldSchema', {
      fieldLabel: 'Name',
      fieldId: 'name',
      fieldType: 'input',
      placeholder: 'Enter your name',
      autofocus: true,
      inputType: 'text'
    });
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);

    assert.ok(this.element.querySelector('input:focus'), '[autofocus] Input is correctly auto focused when the "autofocus" property is true.');


    assert.ok(this.element.querySelector('input').placeholder === 'Enter your name' && this.element.querySelector('label').textContent.trim() === 'Name', 'Custom placeholder renders correctly.');

    this.set('fieldSchema', {
      fieldLabel: 'Name',
      fieldId: 'name',
      fieldType: 'input',
      inputType: 'text',
      defaultValue: ' Little Sebastian '
    });
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.deepEqual(this.element.querySelector('input').value, 'Little Sebastian', 'Default value renders in input, is trimmed by default.');

    this.set('fieldSchema', {
      fieldLabel: 'Name',
      fieldId: 'name',
      fieldType: 'input',
      inputType: 'text',
      hideLabel: true
    });
   
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.notOk(this.element.querySelector('label'), 'Label does not render if "hideLabel" is true.');
    await fillIn(this.element.querySelector('input'), ' Little Sebastian ');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.ok(this.element.querySelector('input').value === ' Little Sebastian ', 'Trimming does not happen on "keyUp".');
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('input').value === 'Little Sebastian', 'Value is trimmed on blur by default.');

    this.set('fieldSchema', {
      fieldLabel: 'Name',
      fieldId: 'name',
      fieldType: 'input',
      inputType: 'text',
      notrim: true,
      defaultValue: ' Little Sebastian '
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.deepEqual(this.element.querySelector('input').value, ' Little Sebastian ', 'Values are not trimmed on insert when notrim is set to true.');
    
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.deepEqual(this.element.querySelector('input').value, ' Little Sebastian ', 'Values are not trimmed on blur when notrim is set to true.');

    this.set('fieldSchema', {
      fieldLabel: 'Number',
      fieldId: 'number',
      fieldType: 'input',
      inputType: 'number',
      notrim: true
    });

    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'number', 'Input renders as type number if inputType is "number".');

    this.set('fieldSchema.inputType', 'email');
    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      notrim: true
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'email', 'Input renders as type email if inputType is "email".');

    this.set('fieldSchema', {
      fieldLabel: 'Password',
      fieldId: 'password',
      fieldType: 'input',
      inputType: 'password',
      notrim: true
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.ok(this.element.querySelector('input').type === 'password', 'Input renders as type password if inputType is "password".');
  });

  test('General validation', async function(assert) {
    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email'
    });

    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));

    assert.dom(this.element.querySelector('div')).hasClass(
      'required',
      'Required class added to fields with "required" as a validationMenthod.'
    );
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Error block shows on focus out of a required field which is empty.');
    assert.deepEqual(this.element.querySelectorAll('[data-test-class="ember-pojo-form-field-error"]').length, 2, 'Multiple error messages show where field fails validation for multiple reasons.');
  

    assert.dom(this.element.querySelector('div')).hasNoClass('valid', "Valid class does not display on invalid field.");
    assert.dom(this.element.querySelector('div')).hasClass('invalid', "Invalid class displays on invalid field.");


    await focus(this.element.querySelector('input'));
    assert.notOk(this.element.querySelector('[data-test-class="ember-pojo-form-field-error"]') || this.element.querySelector('div').classList.contains('invalid') , 'Validation errors and classes are removed on focus in.');

    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email',
      hideSuccessValidation: true
    });

    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await fillIn(this.element.querySelector('input'), 'lil-s@pawnee-gov.com');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('input'));
    assert.dom(this.element.querySelector('div')).hasClass(
      'hide-success-validation',
      '"hide-success-validation" class is added to field where "hideSuccessValidation" is true.'
    );

    await fillIn(this.element.querySelector('input'), 'lil-s');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation error shows where validation fails and "hideSuccessValidation" is true.');

    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: {presence: true, message: '{description} should be present.' }
      }],
      inputType: 'email'
    });
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));

    assert.dom(
      this.element.querySelector('[data-test-class="ember-pojo-form-field-error"]')
    ).hasText(
      'Email should be present.',
      'Custom validation error message displays if passed.'
    );
  });

  test('Custom Validation Events', async function(assert) {
    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email'
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation occurs on focus out, even if "validationEvents" is not part of the field schema.');

    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email',
      validationEvents: ['insert']
    });
    
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    assert.notOk(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation does not occur on insert if default value is null, even if "insert" is passed as a validation event.');

    await clearRender();
    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email',
      validationEvents: ['insert'],
      defaultValue: 'test'
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Field with "insert" as a validation event validates when inserted with a default value.');

    await fillIn(this.element.querySelector('input'), 'test');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.notOk(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation error does not show on keyUp, when keyUp not given as validation event for input, and input value is invalid.');

    this.set('fieldSchema', {
      fieldLabel: 'Email',
      fieldId: 'email',
      fieldType: 'input',
      validationRules: [{
        validationMethod: 'validatePresence',
        arguments: true
      }, {
        validationMethod: 'validateFormat',
        arguments: { type: 'email' }
      }],
      inputType: 'email',
      validationEvents: ['keyUp']
    });
    await render(hbs`{{ember-pojo-form/validating-form-field fieldSchema=fieldSchema}}`);
    await focus(this.element.querySelector('input'));
    assert.notOk(this.element.querySelector('div').classList.contains('valid') || this.element.querySelector('div').classList.contains('invalid'), 'No validation occurs on focus in to a text field.');

    await fillIn(this.element.querySelector('input'), 'test');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation error shows on keyUp, when keyUp given as validation event for input, and input value is invalid.');
    await fillIn(this.element.querySelector('input'), 'lil-s@pawnee-gov.com');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.dom(this.element.querySelector('div')).hasClass('valid', "Success validation works on key up.");

    await fillIn(this.element.querySelector('input'), 'test');
    await blur(this.element.querySelector('input'));
    assert.ok(this.element.querySelector('[data-test-class="ember-pojo-form-field-errors"]'), 'Validation error on focus out of a field that has keyUp as a validation method, and fails validation.');

  });
});
