// BEGIN-SNIPPET custom-field-component.js
// components/custom-fields/phone-number-with-country-code.js
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PhonerNumberWithCountryCodeComponent extends Component {
  countryCodes = [
    {
      name: 'Afghanistan',
      code: '93',
    },
    {
      name: 'Albania',
      code: '355',
    },
    {
      name: 'Algeria',
      code: '213',
    },
    {
      name: 'American Samoa',
      code: '1-684',
    },
    {
      name: 'Andorra',
      code: '376',
    },
    {
      name: 'Angola',
      code: '244',
    },
    {
      name: 'Anguilla',
      code: '1-264',
    },
    {
      name: 'Antarctica',
      code: '672',
    },
    {
      name: 'Antigua and Barbuda',
      code: '1-268',
    },
  ];
  get fieldValueObject() {
    if (!this.args.formField.fieldValue) {
      return {};
    }
    const parts = this.args.formField.fieldValue.split(')');
    return {
      countryCode: parts[0].replace('(', ''),
      phoneNumber: parts[1],
    };
  }

  get selectedCountryCode() {
    return this.countryCodes.find(
      (countryCode) => countryCode.code === this.fieldValueObject.countryCode,
    );
  }

  @action
  inputKeyUp(event) {
    const updatedFieldValue = this.updatedFieldValue(
      'phoneNumber',
      event.target.value,
    );

    this.args.onUserInteraction('keyUpPhoneNumberInput');
    this.args.updateFieldValue(updatedFieldValue);
  }
  @action
  inputChange(event) {
    const updatedFieldValue = this.updatedFieldValue(
      'phoneNumber',
      event.target.value,
    );
    this.args.updateFieldValue(updatedFieldValue);
  }

  @action
  inputFocusIn() {
    this.args.formField.focussed = true;
  }

  @action
  inputFocusOut() {
    this.args.formField.focussed = false;
    this.args.onUserInteraction('focusOutPhoneNumberInput');
  }

  @action
  codeSelected(value) {
    const updatedFieldValue = this.updatedFieldValue('countryCode', value.code);
    this.args.onUserInteraction('countryCodeSelected');
    this.args.updateFieldValue(updatedFieldValue);
  }

  updatedFieldValue(key, value) {
    const newObj = Object.assign({}, this.fieldValueObject);
    newObj[key] = value;
    return `(${newObj.countryCode || ''})${newObj.phoneNumber || ''}`;
  }
}
// END-SNIPPET
