import { find, findAll, click, waitUntil } from '@ember/test-helpers';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import { camelize } from '@ember/string';

export default {
  fieldErrorText(arg) {
    const element = this.getElement(arg);
    const errors = element.querySelectorAll(els.cwfFieldError);
    if (!errors) {
      return;
    }
    return Array.from(errors).map((error) => error.textContent.trim());
  },

  getElement(arg) {
    let element;
    if (typeof arg === 'string') {
      element = find(arg);
      if (!element) {
        throw `No element with selector ${arg} was found`;
      }
    } else {
      element = arg;
    }
    return element;
  },

  getElements(arg, indexes) {
    let elements;
    if (typeof arg === 'string') {
      elements = findAll(arg);
    } else {
      elements = arg;
    }
    if (indexes) {
      elements = indexes.map((index) => elements[index]);
    }
    return elements;
  },

  async waitForMs(ms) {
    const startTimeEpoch = Date.now();
    await waitUntil(
      function () {
        return Date.now() - startTimeEpoch > ms;
      },
      { timeout: ms + 1000 },
    );
    return;
  },

  async passedValidation(arg, assert, opts = {}) {
    const element = this.getElement(arg);
    const validBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`;
    const validBorderColour = 'rgb(25, 135, 84)';
    const validClass = 'is-valid';
    const invalidClass = 'is-invalid';
    await this.waitForMs(200);
    const validatingElement =
      element.querySelector('.form-control') ||
      element.querySelector('.form-check-input');

    const validatingElementType = element.querySelector('.form-control')
      ? 'control'
      : 'check';

    const validatingElementCSS = window.getComputedStyle(
      validatingElement,
      null,
    );
    if (assert) {
      assert
        .dom(validatingElement)
        .hasClass(
          validClass,
          `Form ${validatingElementType} element has class '${validClass}' => ${opts.assertionSuffix}`,
        );
      assert
        .dom(validatingElement)
        .doesNotHaveClass(
          invalidClass,
          `[Field passed validation] Form ${validatingElementType} element does not have class '${invalidClass}' => ${opts.assertionSuffix}`,
        );
      assert.strictEqual(
        validBorderColour,
        validatingElementCSS.getPropertyValue('border-color'),
        `[Field passed validation] Form ${validatingElementType} element has valid border colour => ${opts.assertionSuffix}`,
      );
      if (validatingElementType === 'control') {
        assert.strictEqual(
          validBackgroundImage,
          validatingElementCSS.getPropertyValue('background-image'),
          `[Field passed validation] Form ${validatingElementType} element has valid background image => ${opts.assertionSuffix}`,
        );
      }
      if (validatingElementType === 'check') {
        assert.strictEqual(
          validBorderColour,
          validatingElementCSS.getPropertyValue('background-color'),
          `[Field passed validation] Form ${validatingElementType} element has valid background colour => ${opts.assertionSuffix}`,
        );
      }
    }
    if (
      validatingElement.classList.contains('is-valid') &&
      validatingElementCSS.getPropertyValue('border-color') ===
        validBorderColour &&
      validatingElementCSS.getPropertyValue('background-image') ===
        validBackgroundImage
    ) {
      return true;
    }
    return false;
  },

  async failedValidation(arg, assert, opts = {}) {
    const element = this.getElement(arg);
    const invalidBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`;
    const invalidBorderColour = 'rgb(220, 53, 69)';
    const validClass = 'is-valid';
    const invalidClass = 'is-invalid';
    await this.waitForMs(200);
    const validatingElement =
      element.querySelector('.form-control') ||
      element.querySelector('.form-check-input');

    const validatingElementType = element.querySelector('.form-control')
      ? 'control'
      : 'check';
    const validatingElementCSS = window.getComputedStyle(
      validatingElement,
      null,
    );
    if (assert) {
      assert
        .dom(validatingElement)
        .hasClass(
          invalidClass,
          `[Field failed validation] Form ${validatingElementType} element has class '${invalidClass}' => ${opts.assertionSuffix}`,
        );
      assert
        .dom(validatingElement)
        .doesNotHaveClass(
          validClass,
          `[Field failed validation] Form ${validatingElementType} element does not have class '${validClass}' => ${opts.assertionSuffix}`,
        );
      assert.strictEqual(
        invalidBorderColour,
        validatingElementCSS.getPropertyValue('border-color'),
        `[Field failed validation] Form ${validatingElementType} element has invalid border colour => ${opts.assertionSuffix}`,
      );
      if (validatingElementType === 'control') {
        assert.strictEqual(
          invalidBackgroundImage,
          validatingElementCSS.getPropertyValue('background-image'),
          `[Field failed validation] Form ${validatingElementType} element has invalid background image => ${opts.assertionSuffix}`,
        );
      }
      if (validatingElementType === 'check') {
        assert.strictEqual(
          invalidBorderColour,
          validatingElementCSS.getPropertyValue('background-color'),
          `[Field failed validation] Form ${validatingElementType} element has invalid background colour => ${opts.assertionSuffix}`,
        );
      }
    }
    if (
      validatingElement.classList.contains(invalidClass) &&
      element.querySelector(els.cwfFieldErrors) &&
      validatingElementCSS.getPropertyValue('border-color') ===
        invalidBorderColour &&
      validatingElementCSS.getPropertyValue('background-image') ===
        invalidBackgroundImage
    ) {
      return true;
    }
    return false;
  },

  async allPassedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allPassed = true;
    for (var el of elements) {
      if (!(await this.passedValidation(el))) {
        allPassed = false;
      }
    }
    return allPassed;
  },

  async allFailedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allFailed = true;
    for (var el of elements) {
      if (!(await this.failedValidation(el))) {
        allFailed = false;
      }
    }
    return allFailed;
  },

  async wasValidated(arg) {
    return (
      (await this.passedValidation(arg)) || (await this.failedValidation(arg))
    );
  },

  async allValidated(arg, indexes) {
    const els = this.getElements(arg, indexes);
    for (var el of els) {
      if (!(await this.wasValidated(el))) {
        return false;
      }
    }
    return true;
  },

  async noneValidated(arg, indexes) {
    const els = this.getElements(arg, indexes);
    for (var el of els) {
      if (await this.wasValidated(el)) {
        return false;
      }
    }
    return true;
  },

  async removeClone(arg, indexes) {
    const element = this.getElement(arg);
    if (indexes) {
      const elementsToClick = indexes.map(
        (index) => element.querySelectorAll(els.cwfRemoveClone)[index],
      );
      for (var el of elementsToClick) {
        await click(el);
      }
    } else {
      await click(element.querySelector(els.cwfRemoveClone));
    }
  },

  async addClone(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.cwfAddClone));
  },

  async submitForm(arg) {
    const element = this.getElement(arg);
    await click(element.querySelector(els.cwfSubmitButton));
  },

  removeExtraSpaces(string, whiteSpaceReplacement = ' ') {
    string = string.trim();
    string = string
      .replace(/\s\s+/g, whiteSpaceReplacement)
      .replace(/\r?\n|\r/g, whiteSpaceReplacement);
    return string;
  },

  changesetWebformStateAsJSON(parentSelector, customTransforms) {
    const formElement = find(parentSelector);
    return Array.from(
      formElement.querySelectorAll('[data-test-cwf-field]'),
    ).map((el) => {
      const obj = {
        name: el.getAttribute('data-test-id'),
        fieldType: el
          .getAttribute('data-test-class')
          .replace('cwf-field-type-', ''),
      };
      obj.validationStatus = validationStatus(el);
      const inputSelector = 'input:not([type=checkbox]):not([type=radio])';
      const input = el.querySelector(inputSelector);
      if (input) {
        obj.inputText = input.value;
        if (el.querySelector(`${inputSelector}:placeholder-shown`)) {
          obj.placeholder = input.getAttribute('placeholder');
        }
      }
      if (el.querySelector('[data-test-class="cwf-field-label"]')) {
        obj.label = this.removeExtraSpaces(
          el.querySelector('[data-test-class="cwf-field-label"]').textContent,
        );
      }
      ['radio-button', 'checkbox'].forEach((elType) => {
        if (obj.fieldType === `${elType}-group`) {
          const items = Array.from(
            el.querySelectorAll(`[data-test-labelled-${elType}]`),
          ).map((item) => {
            return {
              label: this.removeExtraSpaces(
                item.querySelector('label').textContent,
              ),
              checked: item.querySelector(
                `input[type="${elType.replace('-button', '')}"]`,
              ).checked,
            };
          });
          obj[camelize(`${elType}-options`)] = {
            items: items,
          };
        }
        if (customTransforms) {
          customTransforms(el, obj);
        }
      });
      if (obj.fieldType === 'single-checkbox') {
        obj[camelize(obj.fieldType)] = {
          label: el.querySelector('label').textContent.trim(), // TODO better selector for this.
          checked: el.querySelector('input[type="checkbox"]').checked,
        };
      }
      if (['power-select', 'power-select-checkboxes'].includes(obj.fieldType)) {
        const elObject = {
          label: this.removeExtraSpaces(
            el.querySelector('[data-test-class="cwf-field-label"]').textContent,
          ),
        };
        if (el.querySelector('.ember-power-select-placeholder')) {
          elObject.placeholder = this.removeExtraSpaces(
            el.querySelector('.ember-power-select-placeholder').textContent,
          );
        }
        if (el.querySelector('.ember-power-select-selected-item')) {
          elObject.selectedItemText = this.removeExtraSpaces(
            el.querySelector('.ember-power-select-selected-item').textContent,
          );
        }
        obj[camelize(obj.fieldType)] = elObject;
      }
      return obj;
    });
  },
};

function validationStatus(el) {
  if (!el.hasAttribute('data-test-validates')) {
    return 'not-applicable';
  }
  if (!el.hasAttribute('data-test-was-validated')) {
    return 'not-validated';
  }
  return el.getAttribute('data-test-validation-status');
}
