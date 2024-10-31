import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PowerSelectCheckboxesComponent extends Component {
  @tracked orderedOptions;
  optionSelected(option) {
    return (this.args.formField.fieldValue || []).includes(option);
  }

  @action
  optionClicked(option) {
    const formField = this.args.formField;
    var currentlySelectedOptions = formField.fieldValue
      ? [...formField.fieldValue] // To avoid mutating the original array
      : [];
    if (currentlySelectedOptions.indexOf(option) > -1) {
      currentlySelectedOptions.removeObject(option);
    } else {
      currentlySelectedOptions.pushObject(option);
    }
    this.args.onUserInteraction('optionClicked');
    this.args.updateFieldValue(currentlySelectedOptions);
  }

  @action onOpen() {
    this.orderedOptions = (this.args.formField.options || [])
      .filter((option) => this.optionSelected(option))
      .concat(
        (this.args.formField.options || []).filter(
          (option) => !this.optionSelected(option),
        ),
      );
  }

  @action
  onkeydown(dropdown, e) {
    // TODO what does this actually do?
    if (e.keyCode === 13) {
      // this.args.onPressEnter(e.target.value);
    }
  }
}
