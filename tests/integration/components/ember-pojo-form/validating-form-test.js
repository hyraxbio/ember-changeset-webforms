import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  triggerKeyEvent,
  focus,
  blur,
  fillIn,
  isSettled
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { datepickerSelect } from 'ember-power-datepicker/test-support';
import {
  clickTrigger as clickTriggerBasicDropdown,
  tapTrigger
} from 'ember-basic-dropdown/test-support/helpers';
import { calendarCenter, calendarSelect } from 'ember-power-calendar/test-support';
import {
  typeInSearch,
  clickTrigger,
  selectChoose
} from 'ember-power-select/test-support/helpers';
import nameInputRequired from './fixtures/form-fields/required/name-input';
import emailInputRequired from './fixtures/form-fields/required/email-input';
import countrySelectRequired from './fixtures/form-fields/required/select-country';
import colourSelect from './fixtures/form-fields/select-colour';
import textAreaBio from './fixtures/form-fields/textarea-bio';
import inputPhoneNumber from './fixtures/form-fields/input-phone-number';
import singleCheckboxSelectTerms from './fixtures/form-fields/required/single-checkbox-accept-terms';
import radioButtonGroupGender from './fixtures/form-fields/required/radio-button-group-gender';
import dateBirthDate from './fixtures/form-fields/date-birth-date';
import fieldOverridesFormSettings from './fixtures/form-fields/field-overrides-form-settings';

module('Integration | Component | validating-form', function(hooks) {
  setupRenderingTest(hooks);

  test('Initial rendering', async function(assert) {
    this.set('formSchema', {
      settings: {
        formName: 'signupForm'
      }
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('form'), 'Form element is rendered.');
    assert.ok(this.element.querySelector('button[data-test-id="evf-submit-form-button"]'), 'Submit form button renders.');
    assert.dom(this.element.querySelector('[data-test-id="evf-submit-form-button"]')).hasText('Submit', 'Correct default text renders on submit form button.');
    
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        submitButtonText: 'Request account'
      }
    });

    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="evf-submit-form-button"]').textContent.trim() === 'Request account', 'Custom text renders on the submit button if specified in form schema.');
    assert.notOk(this.element.querySelector('[data-test-id="evf-reset-form-button"]'), 'Reset button does not show by default.');
    
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        showResetButton: true
      }
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="evf-reset-form-button"]').textContent.trim() === 'Reset', 'If "showResetButton" is true, show the reset button with the correct default button text.');

    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        showResetButton: true,
        resetButtonText: 'Cancel'
      }
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="evf-reset-form-button"]').textContent.trim() === 'Cancel', 'Custom text renders on the reset button if specified in form schema.');
    
  });

  test('Form defaults', async function(assert) {
    // Hide/show field labels
    this.set('formSchema', {
      settings: {
        formName: 'signupForm'
      },
      fields: [nameInputRequired]
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="validating-field-name"] label').textContent.trim() === 'Name', 'Labels show on fields by default.');

    this.set('formSchema', {
      settings: {
        formName: 'signup',
        hideLabels: true,
      },
      fields: [nameInputRequired]
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.notOk(this.element.querySelector('[data-test-id="validating-field-name"] label'), 'Labels hidden on fields by default, if formSchema has "hideLabels: true".');
    
    this.set('formSchema', {
      settings: {
        formName: 'signup',
        hideLabels: true,
      },
      fields: [fieldOverridesFormSettings]
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="validating-field-name"] label'), 'Field setting of "hideLabel:false" overrides form setting of "hideLabels:true".');
   
    // Hide/show field validation
    this.set('formSchema', {
      settings: {
        formName: 'signupForm'
      },
      fields: [nameInputRequired]
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await blur(this.element.querySelector('[data-test-id="validating-field-name"] input'));
    assert.dom(this.element.querySelector('[data-test-id="validating-field-name"]')).hasClass('valid', 'Success validation shows by default for valid field.');

    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        hideSuccessValidation: true,
      },
      fields: [nameInputRequired]
    });

    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);

    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.dom(this.element.querySelector('[data-test-id="validating-field-name"]')).hasNoClass(
      'valid',
      'Success validation hidden in all fields, if formSchema has "hideSuccessValidation:true".'
    );

    this.set('formSchema2', {
      settings: {
        formName: 'signup',
        hideSuccessValidation: true,
      },
      fields: [fieldOverridesFormSettings]
    });

    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema2}}`);

    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'lsebastian@pawneegov.org');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await blur(this.element.querySelector('[data-test-id="validating-field-name"] input'));
    assert.dom(this.element.querySelector('[data-test-id="validating-field-name"]')).hasClass(
      'valid',
      'Success validation shows where individual field has "hideSuccessValidation:false", and formSchema has "hideSuccessValidation=true".'
    );

    this.set('formSchema', {
      settings: {
        formName: 'signup',
        submitDisabled: true,
      }
    });
    await render(hbs`{{ember-pojo-form/validating-form formSchema=formSchema}}`);
    assert.ok(this.element.querySelector('[data-test-id="evf-submit-form-button"]:disabled'), 'Submit button is disabled when "submitDisabled" is true in settings.')
  });

  test('Basic actions', async function(assert) {
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        showResetButton: true
      },
      fields: [nameInputRequired]
    });

    this.set('dummyAction_afterKeyUpAction', (value, event, formField) => {
      this.set('afterKeyUpActionValue', value);
    });

    this.set('dummyAction_customTransforms', (formFields, fieldId, formSettings) => {
      this.set('customTransformFieldLabel', formFields[0].fieldLabel);
      this.set('customTransformFieldId', fieldId);
      this.set('customTransformFormName', formSettings.formName);
    });

    this.set('testAction', (actual) => {
    });

    await render(hbs`
      {{ember-pojo-form/validating-form
        formSchema=formSchema
        formValidationPassed=(action testAction)
        customValidations=(action testAction)
        afterKeyUpAction=(action dummyAction_afterKeyUpAction)
      }}`
    );
    // await this.pauseTest();
    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.deepEqual(this.get('afterKeyUpActionValue'), 'Little Sebastian', '"value" object passed to afterKeyUpAction action when user types.');
    await click(this.element.querySelector('[data-test-id="evf-reset-form-button"]'));
    
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-name"] input').value, '', 'Form values reset in template when reset button is clicked');
    assert.dom(this.element.querySelector('[data-test-id="validating-field-name"]')).hasNoClass(
      'valid',
      'Form validation class resets in template when reset button is clicked'
    );
    // await this.pauseTest();
    await render(hbs`
      {{ember-pojo-form/validating-form
        formSchema=formSchema
        customTransforms=dummyAction_customTransforms
      }}`
    );
    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    assert.deepEqual(this.get('customTransformFieldLabel'), 'Name', '"formField" object passed to customTransforms action when field is updated.');
    assert.deepEqual(this.get('customTransformFieldId'), 'name', '"fieldId" object passed to customTransforms action when field is updated.');
    assert.deepEqual(this.get('customTransformFormName'), 'signupForm', '"formSettings" object passed to customTransforms action when field is updated.');
  });

  test('Form validation on submit', async function(assert) {
    this.set('dummyAction_formValidationFailed', (formFields, formSettings) => {
      assert.deepEqual(formSettings.submitButtonFeedback, 'Some fields have errors which must be fixed before continuing.', 'Follow up action is sent when form validation fails, with formFields and formSettings as arguments.');
    });

    this.set('dummyAction_submitAction', (changeset) => {
      this.set('submittedChangeset', changeset);
    });

    this.set('dummyAction_saveFail', (response, formFields, formSettings) => {
      assert.ok('' === '', 'Save success action is fired');
    });

    this.set('testAction', (actual) => {
    });

    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
      },
      fields: [nameInputRequired, emailInputRequired, countrySelectRequired, colourSelect, textAreaBio, inputPhoneNumber, dateBirthDate, radioButtonGroupGender, singleCheckboxSelectTerms]
    });

    await render(hbs`{{ember-pojo-form/validating-form
      formSchema=formSchema
      formValidationFailed=(action dummyAction_formValidationFailed)
      submitAction=(action dummyAction_submitAction)
      saveFail=(action testAction)
      formValidationPassed=(action testAction)
      customValidations=(action testAction)
    }}`);
    await click(this.element.querySelector('[data-test-id="evf-submit-form-button"]'));
    await isSettled();
    assert.deepEqual(this.element.querySelectorAll('[data-test-class="ember-pojo-form-field-errors"]').length, this.element.querySelectorAll('.required').length, 'All required but empty fields get errors, when submit is clicked with no other interaction.');


    assert.dom(this.element.querySelector('form')).hasClass(
      'validation-failed',
      'Form gets class "validation-failed" when validation fails.'
    );
    // TODO find a way to test Enter key press to submit form.
    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
  
    await fillIn(this.element.querySelector('[data-test-id="validating-field-email"] input'), 'lsebastian@pawneegov.org');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);

    await fillIn(this.element.querySelector('[data-test-id="validating-field-bio"] textarea'), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente exercitationem, architecto maiores delectus optio id similique eveniet repellat distinctio perspiciatis, iusto eligendi consequatur hic ipsam ut atque! A, quod porro.');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await fillIn(this.element.querySelector('[data-test-id="validating-field-info.phone_number"] input'), '354674234');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await selectChoose('[data-test-id="validating-field-info.address.country"]', 'South Africa');

    await click(this.element.querySelector('[data-test-id="validating-field-gender"] [data-test-id="radio-option-gender-male"] input'));
    await clickTriggerBasicDropdown('[data-test-id="validating-field-info.birth_date"]');
    await calendarCenter('.power-calendar-select-birth-date', new Date(2016, 9, 27));
    await calendarSelect('.power-calendar-select-birth-date', new Date(2016, 9, 24));
    await click('[data-test-id="validating-field-accept_terms"] input');

    await click(this.element.querySelector('[data-test-id="evf-submit-form-button"]'));
    await isSettled();
    var changeset = this.get('submittedChangeset');
    assert.deepEqual(changeset.get('email'), 'lsebastian@pawneegov.org', 'Top level form values are included in the top level of the values object sent to "submitAction".');
    assert.deepEqual(changeset.get('info.phone_number'), '354674234', 'Second level form values are included in the second level of the values object sent to "submitAction".');
    assert.deepEqual(changeset.get('info.address.country'), 'South Africa', 'Third level form values are included in the third level of the values object sent to "submitAction".');

    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
        resetAfterSubmit: false
      },
      fields: [nameInputRequired]
    });
    await render(hbs`{{ember-pojo-form/validating-form
      formSchema=formSchema
      formValidationFailed=(action testAction)
      submitAction=(action dummyAction_submitAction)
      saveFail=(action testAction)
      formValidationPassed=(action testAction)
      customValidations=(action testAction)
    }}`);
    await fillIn(this.element.querySelector('[data-test-id="validating-field-name"] input'), 'Little Sebastian');
    await triggerKeyEvent(this.element.querySelector('input'), "keyup", 1);
    await click(this.element.querySelector('[data-test-id="evf-submit-form-button"]'));
    await isSettled();
    assert.equal(this.element.querySelector('[data-test-id="validating-field-name"] input').value, 'Little Sebastian', 'Form is not cleared after success response returns from submitForm action, if "resetAfterSubmit" is false.'); //TODO move to acceptance.
  });

  test('Block template format', async function(assert) {
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
      },
      fields: [nameInputRequired]
    });
    await render(hbs `{{#ember-pojo-form/validating-form
      formSchema=formSchema
      settings=(hash
        submitDisabled=true 
      )
    }}
      <div class="yielded-div">
        Test
      </div>
    {{/ember-pojo-form/validating-form}}`);
    
    assert.ok(this.element.querySelector('div.yielded-div'), 'Yielded content in block format is rendered.');
  });

  test('Rendering from settings hash', async function(assert) {
    await render(hbs `{{ember-pojo-form/validating-form
      settings=(hash
        formName="signupForm"
      )
    }}`);
    
    assert.ok(this.element.querySelector('[data-test-id="validating-form"]'), 'Form renders with settings hash.');
    this.set('formFields', [nameInputRequired]);
    await render(hbs `{{ember-pojo-form/validating-form
      settings=(hash
        formName="signupForm"
        hideLabels=true
      )
      fields=formFields
    }}`);
    assert.ok(this.element.querySelector('[data-test-id="validating-field-name"]'), 'Form fields render when passing a fields array in template.');
    assert.notOk(this.element.querySelector('[data-test-id="validating-field-name"] label'), 'Form settings in settings hash applied correctly.');
  });

  test('Form props work correctly', async function(assert) {
    this.set('model', {
      name: 'Ron Swanson',
      info: {
        address: {
          country: 'South Africa'
        }
      }
    });
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
      },
      fields: [nameInputRequired, countrySelectRequired]
    });
    await render(hbs`
    {{ember-pojo-form/validating-form 
      formSchema=formSchema 
      data=model
      propsHash=(hash
        name=model.name
        info=(hash
          address=(hash
            country=model.info.address.country
          )
        )
      )
    }}
    `);
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-name"] input').value, 'Ron Swanson', 'Top level props are correclty applied to form fields on initial render.');
    // await this.pauseTest();
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-info.address.country"] .ember-power-select-selected-item').textContent.trim(), 'South Africa', 'Third level props are correclty applied to form fields on initial render.');
    this.set('model.name', 'Lesley Knope');
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-name"] input').value, 'Lesley Knope', 'Props hash causes form rerender when top level model prop is updated.');
    this.set('model.info.address.country', 'Brazil');
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-info.address.country"] .ember-power-select-selected-item').textContent.trim(), 'Brazil', 'Props hash causes form rerender when third level model prop is updated.');

    nameInputRequired.defaultValue = 'April Ludgate'
    this.set('formSchema', {
      settings: {
        formName: 'signupForm',
      },
      fields: [nameInputRequired, countrySelectRequired]
    });
    await render(hbs`
      {{ember-pojo-form/validating-form 
        formSchema=formSchema 
        data=model
      }}`
    );
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-name"] input').value, 'Lesley Knope', 'value from props hash is used as form field value instead of defaultValue of field, where both are present.');
    this.set('model', {
      info: {
        address: {
          country: 'South Africa'
        }
      }
    });
    await render(hbs`
      {{ember-pojo-form/validating-form 
        formSchema=formSchema 
        data=model
      }}`
    );
    assert.deepEqual(this.element.querySelector('[data-test-id="validating-field-name"] input').value, 'April Ludgate', 'The defaultValue from a field definition is applied when not overriden by a property in the props hash.');
  });
});
