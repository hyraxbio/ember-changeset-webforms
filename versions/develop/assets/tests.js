'use strict';

define("dummy/tests/acceptance/basic-usage-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-cli-mirage/test-support"], function (_testHelpers, _qunit, _emberQunit, _testSupport) {
  "use strict";

  (0, _qunit.module)('Acceptance | Basic usage', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _testSupport.setupMirage)(hooks);
    (0, _qunit.test)('Basic usage', async function (assert) {
      await (0, _testHelpers.visit)('/docs/basic-usage');
      await this.pauseTest();
    });
  });
});
define("dummy/tests/acceptance/cloned-fields-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-cli-mirage/test-support", "dummy/tests/acceptance/test-selectors", "dummy/tests/acceptance/custom-test-helpers", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _testSelectors, _customTestHelpers, _helpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | Cloned fields', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _testSupport.setupMirage)(hooks);
    (0, _qunit.test)('Basics', async function (assert) {
      await (0, _testHelpers.visit)('/docs/clonable-form-fields');
      await (0, _testHelpers.click)(_testSelectors.default.fireFormAddCloneButton);
      await (0, _testHelpers.click)(_testSelectors.default.fireFormAddCloneButton);
      const clones = (0, _testHelpers.findAll)(_testSelectors.default.clonedFormField);
      assert.equal(clones.length, 2, 'Min clones setting of 2 results in two cloned fields on load.');
      await (0, _testHelpers.typeIn)(clones[0].querySelector('input'), 'gob');
      await (0, _testHelpers.blur)(clones[0].querySelector('input'));
      assert.equal(clones[0].querySelectorAll(_testSelectors.default.fireFormFieldError).length, 2, 'First clone gets correct validation error messages when user focusses out and clone is empty.');
      assert.ok(clones[0].querySelector(_testSelectors.default.fireFormField).classList.contains('invalid'), 'First clone gets class "invalid" when user focusses out and clone is empty.');
      assert.ok(clones[1].querySelectorAll(_testSelectors.default.fireFormFieldError).length === 0, 'Second clone is not validated on focus out of first clone.'); // assert.notOk(clones[1].querySelector(els.fireFormField).classList.contains('invalid'), 'Invalid field without validation event "keyUp" gets class "invalid" on focus out.');  HOW TO SAY CLASSLIST DOES NOT CONTAIN?

      await this.pauseTest();
      await (0, _testHelpers.click)(_testSelectors.default.fireFormAddCloneButton);
      assert.ok(clones[0].querySelectorAll(_testSelectors.default.fireFormFieldError).length === 2 && clones[0].querySelector(_testSelectors.default.fireFormField).classList.contains('invalid'), 'First clone validation status is not affected by clicking add clone button.');
      assert.notOk(clones[1].querySelector(_testSelectors.default.fireFormField).classList.contains('valid'), 'Second clone does not get class "valid" clicking add clone button.');
    });
  });
});
define("dummy/tests/acceptance/custom-test-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    textContentArray(elements) {
      return (elements || []).map(element => {
        return element.textContent.trim();
      });
    }

  };
  _exports.default = _default;
});
// Enter to submit while in an input.
define("dummy/tests/acceptance/form-submission-test", [], function () {
  "use strict";
});
define("dummy/tests/acceptance/test-selectors", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    fireFormField: '[data-test-ember-changeset-webforms-field]',
    fireFormFieldErrors: '[data-test-class="ember-changeset-webforms-field-errors"]',
    fireFormFieldError: '[data-test-class="ember-changeset-webforms-field-error"]',
    fireFormResetButton: '[data-test-id="evf-reset-form-button"]',
    fireFormSubmitButton: '[data-test-id="evf-submit-form-button"]',
    clonedFormField: '[data-test-class="cloned-field"]',
    removeClone: '[data-test-class="remove-clone"]',
    fireFormClonedField: '[data-test-class="cloned-field"]',
    fireFormAddCloneButton: '[data-test-id="add-clone"]',
    passwordField: '[data-test-id="password-field"]',
    emailField: '[data-test-id="email-field"]',
    nameField: '[data-test-id="name-field"]',
    acceptTermsTrueRadioButton: '[data-test-id="acceptTerms-radio-option-true"]',
    countryField: '[data-test-id="details.country-field"]',
    acceptTermsField: '[data-test-id="acceptTerms-field"]',
    confirmHumanField: '[data-test-id="confirmHuman-field"]'
  };
  _exports.default = _default;
});
define("dummy/tests/acceptance/validation-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-cli-mirage/test-support", "dummy/tests/acceptance/test-selectors", "dummy/tests/acceptance/custom-test-helpers", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _testSelectors, _customTestHelpers, _helpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | Field validation', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _testSupport.setupMirage)(hooks);
    (0, _qunit.test)('Validation events', async function (assert) {
      await (0, _testHelpers.visit)('/docs/field-validation');
      assert.dom(`${_testSelectors.default.nameField} ${_testSelectors.default.fireFormFieldErrors}`).doesNotExist('Required but empty field with validation events "keyUp" and "insert" does not have class "invalid" on insert.');
      await (0, _testHelpers.focus)(`${_testSelectors.default.nameField} input`);
      await (0, _testHelpers.blur)(`${_testSelectors.default.nameField} input`);
      assert.dom(`${_testSelectors.default.nameField} ${_testSelectors.default.fireFormFieldErrors}`).exists('Validation runs on focus out of text input.');
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.nameField}`).classList.contains('invalid'), 'Empty name field has class "invalid" after focus out.');
      assert.equal((0, _testHelpers.findAll)(`${_testSelectors.default.nameField} ${_testSelectors.default.fireFormFieldError}`).length, 1, 'One error message shows for empty name field after focus out.');
      assert.equal((0, _testHelpers.findAll)(`${_testSelectors.default.nameField} ${_testSelectors.default.fireFormFieldError}`)[0].textContent, `Name can't be blank`, 'Correct default error message shows for empty name field after focus out.');
      await (0, _testHelpers.focus)(`${_testSelectors.default.nameField} input`);
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.nameField}`).classList.contains('invalid'), 'Field with "keyUp" validation event does not lose  class "invalid" when focussed.');
      await (0, _testHelpers.typeIn)(`${_testSelectors.default.nameField} input`, 'T');
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.nameField}`).classList.contains('valid'), 'Name field gets class "valid" on keyUp when user types single char.');
      await (0, _testHelpers.fillIn)(`${_testSelectors.default.nameField} input`, '');
      await (0, _testHelpers.triggerKeyEvent)((0, _testHelpers.find)(`${_testSelectors.default.nameField} input`), "keyup", 1);
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.nameField}`).classList.contains('invalid'), 'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.');
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.emailField}`).classList.contains('valid'), 'valid field with "insert" as a validation event has class "valid" on insert.');
      await (0, _testHelpers.focus)(`${_testSelectors.default.emailField} input`);
      assert.notOk((0, _testHelpers.find)(`${_testSelectors.default.emailField}`).classList.contains('valid'), 'Field without validation event "keyUp" loses class "valid" when focussed.');
      await (0, _testHelpers.fillIn)(`${_testSelectors.default.emailField} input`, 'bluemangroup');
      await (0, _testHelpers.blur)(`${_testSelectors.default.emailField} input`);
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" gets class "invalid" on focus out.');
      await (0, _testHelpers.focus)(`${_testSelectors.default.emailField} input`);
      assert.notOk((0, _testHelpers.find)(`${_testSelectors.default.emailField}`).classList.contains('invalid'), 'Invalid field without validation event "keyUp" loses class "invalid" when focussed.');
      await (0, _testHelpers.click)(`${_testSelectors.default.acceptTermsTrueRadioButton} input[type="radio"]`);
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.acceptTermsField}`).classList.contains('valid'), 'Validation runs after selecting option in radio button group.');
      await (0, _testHelpers.click)(`${_testSelectors.default.confirmHumanField} input[type="checkbox"]`);
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.confirmHumanField}`).classList.contains('valid'), 'Validation runs after checking single checkbox.');
      await (0, _helpers.selectChoose)((0, _testHelpers.find)(_testSelectors.default.countryField), 'United States');
      assert.ok((0, _testHelpers.find)(`${_testSelectors.default.countryField}`).classList.contains('valid'), 'Validation runs after selecting power select option.'); // TODO checkbox group and text area.
    });
    (0, _qunit.test)('Validation messages', async function (assert) {
      await (0, _testHelpers.visit)('/docs/field-validation');
      await (0, _testHelpers.click)(_testSelectors.default.fireFormSubmitButton);
      assert.equal((0, _testHelpers.findAll)(_testSelectors.default.fireFormFieldErrors).length, 5, 'All fields with validation rules are validated when user clicks submit button.');
      assert.equal((0, _testHelpers.findAll)(`${_testSelectors.default.countryField} ${_testSelectors.default.fireFormFieldError}`)[0].textContent, `Nation of origin can't be blank`, 'Passing "description" as an argument to validationRules replaces the default validation description ("Details.country) with the description provided.');
      assert.equal((0, _testHelpers.findAll)(`${_testSelectors.default.acceptTermsField} ${_testSelectors.default.fireFormFieldError}`)[0].textContent, 'You must accept the terms to continue.', 'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.');
      await (0, _testHelpers.fillIn)(`${_testSelectors.default.emailField} input`, '');
      await (0, _testHelpers.blur)(`${_testSelectors.default.emailField} input`);
      assert.equal((0, _testHelpers.findAll)(`${_testSelectors.default.emailField} ${_testSelectors.default.fireFormFieldError}`).length, 2, 'Multiple errors display where multiple exist.');
    });
    (0, _qunit.test)('Custom validators', async function (assert) {
      await (0, _testHelpers.visit)('/docs/integrating-custom-validators');
      await (0, _testHelpers.click)(_testSelectors.default.fireFormSubmitButton);
      assert.equal(_customTestHelpers.default.textContentArray((0, _testHelpers.findAll)(_testSelectors.default.fireFormFieldError)).join('|'), 'Each field must be unique- primary email is the same as recovery email.|Each field must be unique- recovery email is the same as primary email.', 'Custom validator is applied correctly.');
    });
  });
});
define("dummy/tests/helpers/ember-cli-clipboard", ["exports", "ember-cli-clipboard/test-support"], function (_exports, _testSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.triggerSuccess = triggerSuccess;
  _exports.triggerError = triggerError;
  _exports.default = _default;

  const getOwnerFromContext = c => c.container || c.owner;
  /* === Legacy Integration Test Helpers === */

  /**
   * Fires `success` action for an instance of a copy-button component
   * @function triggerSuccess
   * @param {Object} context - integration test’s this context
   * @param {String} selector - css selector of the copy-button instance
   * @returns {Void}
   */


  function triggerSuccess(context, selector) {
    const owner = getOwnerFromContext(context);
    (0, _testSupport._fireComponentAction)(owner, selector, 'success');
  }
  /**
   * Fires `error` action for an instance of a copy-button component
   * @function triggerError
   * @param {Object} context - integration test’s this context
   * @param {String} selector - css selector of the copy-button instance
   * @returns {Void}
   */


  function triggerError(context, selector) {
    const owner = getOwnerFromContext(context);
    (0, _testSupport._fireComponentAction)(owner, selector, 'error');
  }
  /* === Register Legacy Acceptance Test Helpers === */


  function _default() {
    Ember.Test.registerAsyncHelper('triggerCopySuccess', function (app, selector) {
      const owner = app.__container__;
      (0, _testSupport._fireComponentAction)(owner, selector, 'success');
    });
    Ember.Test.registerAsyncHelper('triggerCopyError', function (app, selector) {
      const owner = app.__container__;
      (0, _testSupport._fireComponentAction)(owner, selector, 'error');
    });
  }
});
define("dummy/tests/helpers/ember-power-calendar", ["exports", "ember-power-calendar/test-support"], function (_exports, _testSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default() {
    Ember.Test.registerAsyncHelper('calendarCenter', async function (app, selector, newCenter) {
      return (0, _testSupport.calendarCenter)(selector, newCenter);
    });
    Ember.Test.registerAsyncHelper('calendarSelect', async function (app, selector, selected) {
      return (0, _testSupport.calendarSelect)(selector, selected);
    });
  }
});
define("dummy/tests/helpers/ember-power-select", ["exports", "ember-power-select/test-support/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecatedRegisterHelpers;
  _exports.selectChoose = _exports.touchTrigger = _exports.nativeTouch = _exports.clickTrigger = _exports.typeInSearch = _exports.triggerKeydown = _exports.nativeMouseUp = _exports.nativeMouseDown = _exports.findContains = void 0;

  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, {
        until: '1.11.0',
        id: `ember-power-select-test-support-${name}`
      }));
      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  _exports.findContains = findContains;
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  _exports.nativeMouseDown = nativeMouseDown;
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  _exports.nativeMouseUp = nativeMouseUp;
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  _exports.triggerKeydown = triggerKeydown;
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  _exports.typeInSearch = typeInSearch;
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  _exports.clickTrigger = clickTrigger;
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  _exports.nativeTouch = nativeTouch;
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  _exports.touchTrigger = touchTrigger;
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');
  _exports.selectChoose = selectChoose;

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, {
      until: '1.11.0',
      id: 'ember-power-select-test-support-register-helpers'
    }));
    return (0, _helpers.default)();
  }
});
define("dummy/tests/integration/components/background/labelled-checkbox-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | background/labelled-checkbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{background/labelled-checkbox}}
      */
      {
        id: "SUclsWl0",
        block: "{\"symbols\":[],\"statements\":[[1,[22,\"background/labelled-checkbox\"],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#background/labelled-checkbox}}
              template block text
            {{/background/labelled-checkbox}}
          
      */
      {
        id: "8e53LYOW",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"background/labelled-checkbox\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("dummy/tests/integration/components/background/power-calendar-nav-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | background/power-calendar-nav', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{background/power-calendar-nav}}
      */
      {
        id: "0NCun6Xs",
        block: "{\"symbols\":[],\"statements\":[[1,[22,\"background/power-calendar-nav\"],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#background/power-calendar-nav}}
              template block text
            {{/background/power-calendar-nav}}
          
      */
      {
        id: "VI+rO9Mg",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"background/power-calendar-nav\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("dummy/tests/integration/components/background/power-date-range-picker-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | background/power-date-range-picker', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{background/power-date-range-picker}}
      */
      {
        id: "CzrlUxOR",
        block: "{\"symbols\":[],\"statements\":[[1,[22,\"background/power-date-range-picker\"],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#background/power-date-range-picker}}
              template block text
            {{/background/power-date-range-picker}}
          
      */
      {
        id: "TB6WNOfZ",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"background/power-date-range-picker\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("dummy/tests/integration/components/background/power-datetime-picker-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | background/power-datetime-picker', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{background/power-datetime-picker}}
      */
      {
        id: "37SQ09+e",
        block: "{\"symbols\":[],\"statements\":[[1,[22,\"background/power-datetime-picker\"],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#background/power-datetime-picker}}
              template block text
            {{/background/power-datetime-picker}}
          
      */
      {
        id: "+KAK5WLU",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"background/power-datetime-picker\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("dummy/tests/integration/components/background/power-select-option-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | background/power-select-option', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{background/power-select-option}}
      */
      {
        id: "Qe307r/j",
        block: "{\"symbols\":[],\"statements\":[[1,[22,\"background/power-select-option\"],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#background/power-select-option}}
              template block text
            {{/background/power-select-option}}
          
      */
      {
        id: "+WO+H/3K",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"background/power-select-option\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("dummy/tests/integration/helpers/ember-changeset-webforms/array-join-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | ember-changeset-webforms/array-join', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{ember-changeset-webforms/array-join inputValue}}
      */
      {
        id: "OIkMUhEK",
        block: "{\"symbols\":[],\"statements\":[[1,[28,\"ember-changeset-webforms/array-join\",[[24,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        meta: {}
      }));
      assert.dom(this.element).hasText('1234');
    });
  });
});
define("dummy/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/dropdown-with-input.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/dropdown-with-input.js should pass ESLint\n\n');
  });
  QUnit.test('components/forms/login-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/forms/login-form.js should pass ESLint\n\n');
  });
  QUnit.test('components/forms/test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/forms/test.js should pass ESLint\n\n');
  });
  QUnit.test('components/forms/uniqueness.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/forms/uniqueness.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/docs/basic-usage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/docs/basic-usage.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/docs/clonable-form-fields.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/docs/clonable-form-fields.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/docs/creating-custom-fields.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/docs/creating-custom-fields.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/docs/field-validation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/docs/field-validation.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/docs/integrating-custom-validators.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/docs/integrating-custom-validators.js should pass ESLint\n\n');
  });
  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
  QUnit.test('services/ember-changeset-webforms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ember-changeset-webforms.js should pass ESLint\n\n');
  });
  QUnit.test('services/global-variables.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/global-variables.js should pass ESLint\n\n');
  });
  QUnit.test('services/session.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/session.js should pass ESLint\n\n');
  });
  QUnit.test('validators/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/index.js should pass ESLint\n\n');
  });
  QUnit.test('validators/uniqueness.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/uniqueness.js should pass ESLint\n\n');
  });
});
define("dummy/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('dummy/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/components/dropdown-with-input.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/components/dropdown-with-input.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/components/forms/login-form.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/components/forms/login-form.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/components/forms/test.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/components/forms/test.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/components/forms/uniqueness.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/components/forms/uniqueness.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/docs.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/docs.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('dummy/templates/not-found.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'dummy/templates/not-found.hbs should pass TemplateLint.\n\ndummy/templates/not-found.hbs\n  1:5  error  elements cannot have inline styles  no-inline-styles\n');
  });
});
define("dummy/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/basic-usage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/basic-usage-test.js should pass ESLint\n\n1:17 - \'find\' is defined but never used. (no-unused-vars)\n1:23 - \'click\' is defined but never used. (no-unused-vars)\n1:30 - \'findAll\' is defined but never used. (no-unused-vars)\n1:39 - \'typeIn\' is defined but never used. (no-unused-vars)\n10:38 - \'assert\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('acceptance/cloned-fields-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/cloned-fields-test.js should pass ESLint\n\n1:17 - \'find\' is defined but never used. (no-unused-vars)\n1:47 - \'focus\' is defined but never used. (no-unused-vars)\n1:60 - \'fillIn\' is defined but never used. (no-unused-vars)\n1:68 - \'triggerKeyEvent\' is defined but never used. (no-unused-vars)\n6:8 - \'cth\' is defined but never used. (no-unused-vars)\n7:10 - \'selectChoose\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('acceptance/custom-test-helpers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/custom-test-helpers.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/form-submission-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/form-submission-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/test-selectors.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/test-selectors.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/validation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/validation-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/background/labelled-checkbox-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/background/labelled-checkbox-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/background/power-calendar-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/background/power-calendar-nav-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/background/power-date-range-picker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/background/power-date-range-picker-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/background/power-datetime-picker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/background/power-datetime-picker-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/background/power-select-option-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/background/power-select-option-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/ember-changeset-webforms/array-join-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/ember-changeset-webforms/array-join-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define("dummy/tests/test-helper", ["dummy/app", "dummy/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  // import registerPowerCalendarHelpers from 'ember-power-calendar/test-support/helpers/ember-power-calendar';
  // registerPowerCalendarHelpers();
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
