// BEGIN-SNIPPET custom-field-component.js
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
  get displayObject() {
    if (!this.args.displayValue) {
      return {};
    }
    const parts = this.args.displayValue.split(')');
    return {
      countryCode: parts[0].replace('(', ''),
      phoneNumber: parts[1],
    };
  }

  get selectedCountryCode() {
    return this.countryCodes.find(
      (countryCode) => countryCode.code === this.displayObject.countryCode,
    );
  }

  @action
  inputKeyUp(event) {
    const updatedFieldValue = this.updatedFieldvalue(
      'phoneNumber',
      event.target.value,
    );

    this.args.onUserInteraction('keyUpPhoneNumberInput', updatedFieldValue);
    this.args.onChange(updatedFieldValue);
  }
  @action
  inputChange(event) {
    const updatedFieldValue = this.updatedFieldvalue(
      'phoneNumber',
      event.target.value,
    );
    this.args.onChange(updatedFieldValue);
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
  codeSelected(formField, value) {
    const updatedFieldValue = this.updatedFieldvalue('countryCode', value.code);
    this.args.onUserInteraction('countryCodeSelected');
    this.args.onChange(updatedFieldValue);
  }

  updatedFieldvalue(key, value) {
    const newObj = Object.assign({}, this.displayObject);
    newObj[key] = value;
    return `(${newObj.countryCode || ''})${newObj.phoneNumber || ''}`;
  }
}
// END-SNIPPET
