import { find, findAll, click } from '@ember/test-helpers';
import els from 'ember-changeset-webforms/test-support/element-selectors';

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

  passedValidation(arg) {
    const element = this.getElement(arg);
    if (
      element.classList.contains('is-valid') ||
      element.querySelector('.is-valid')
    ) {
      return true;
    }
    return false;
  },

  allPassedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allPassed = true;
    elements.forEach((el) => {
      if (!this.passedValidation(el)) {
        allPassed = false;
      }
    });
    return allPassed;
  },

  failedValidation(arg) {
    const element = this.getElement(arg);
    if (
      (element.classList.contains('is-invalid') ||
        element.querySelector('.is-invalid')) &&
      element.querySelector(els.cwfFieldErrors)
    ) {
      return true;
    }
    return false;
  },

  allFailedValidation(arg, indexes) {
    const elements = this.getElements(arg, indexes);
    let allFailed = true;
    elements.forEach((el) => {
      if (!this.failedValidation(el)) {
        allFailed = false;
      }
    });
    return allFailed;
  },

  wasValidated(arg) {
    return this.passedValidation(arg) || this.failedValidation(arg);
  },

  allValidated(arg, indexes) {
    const els = this.getElements(arg, indexes);
    return els
      .map((el) => this.wasValidated(el))
      .every((item) => item === true);
  },

  noneValidated(arg, indexes) {
    const els = this.getElements(arg, indexes);
    return !els
      .map((el) => this.wasValidated(el))
      .filter((item) => item === true);
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
        'data-test-id': el.getAttribute('data-test-id'),
        fieldType: el
          .getAttribute('data-test-class')
          .replace('cwf-field-type-', ''),
      };
      if (el.hasAttribute('data-test-validates')) {
        obj.validates = true;
        obj.wasValidated = el.hasAttribute('data-test-was-validated');
      }

      if (obj.wasValidated && el.hasAttribute('data-test-validation-status')) {
        obj.validationStatus = el.getAttribute('data-test-validation-status');
      }
      const input = el.querySelector(
        'input:not([type=checkbox]):not([type=radio]',
      );
      if (input) {
        obj.inputText = input.value;
      }
      if (el.querySelector('label')) {
        obj.label = this.removeExtraSpaces(
          el.querySelector('label').textContent,
        );
      }
      if (el.classList.contains('field-type-radio-button-group')) {
        const items = Array.from(
          el.querySelectorAll('.labelled-radio-button'),
        ).map((item) => {
          return {
            label: this.removeExtraSpaces(
              item.querySelector('label').textContent,
            ),
            checked: item.querySelector('input[type="radio"]').checked,
          };
        });
        obj.radioButtons = {
          label: el.querySelector('label').textContent.trim(),
          items: items,
        };
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
              checked: item.querySelector(`input[type="${elType}"]`).checked,
            };
          });
          obj[`${elType}-options`] = {
            label: el.querySelector('label').textContent.trim(),
            items: items,
          };
        }
        if (customTransforms) {
          customTransforms(el, obj);
        }
      });

      if (el.classList.contains('field-type-single-checkbox')) {
        obj.singleCheckbox = {
          label: el.querySelector('label').textContent.trim(),
          checked: el.querySelector('input[type="checkbox"]').checked,
        };
      }
      if (el.classList.contains('field-type-power-select')) {
        obj.powerSelect = {
          label: this.removeExtraSpaces(el.querySelector('label').textContent),
          checked: el.querySelector('.ember-power-select-selected-item')
            ? this.removeExtraSpaces(
                el.querySelector('.ember-power-select-selected-item')
                  .textContent,
              )
            : '',
        };
      }
      return obj;
    });
  },
};
