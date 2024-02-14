import { action } from '@ember/object';
import Component from '@glimmer/component';
import { typeOf as emberTypeOf } from '@ember/utils';
export default class PowerSelect extends Component {
  get componentName() {
    return this.args.formField.multipleSelection
      ? 'power-select-multiple'
      : 'power-select';
  }

  @action
  onChange(formField, value, _selectComponent, event) {
    if ((value || []).length === 0) {
      value = null;
    }
    this.args.updateFieldValue(value);
    this.args.onUserInteraction(value, 'optionSelected', event);
  }

  @action
  onKeydown(formField, dropdown, event) {
    const primitiveOptions = dropdown.options.map((option) => {
      if (
        emberTypeOf(option) === 'object' &&
        this.args.formField.optionDisplayProp
      ) {
        return option[this.args.formField.optionDisplayProp];
      } else {
        return option;
      }
    });
    if (event.keyCode === 13) {
      event.preventDefault();
      if (
        formField.multipleSelection &&
        formField.allowFreeTyping &&
        !primitiveOptions.find(
          (primitiveOption) =>
            primitiveOption
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) > -1,
        )
      ) {
        let value = this.fieldValue || [];
        var newItem;
        if (this.args.formField.optionDisplayProp) {
          newItem = {};
          newItem[this.args.formField.optionDisplayProp] = event.target.value;
        } else {
          newItem = event.target.value;
        }
        value.push(newItem);
        this.args.onUserInteraction(
          'keyDownEnterPowerSelectMultiple',
          newItem,
          event,
        );
        this.args.updateFieldValue(value, 'keyDownPowerSelect', event);
      }
      this.args.onUserInteraction('keyDownPowerSelect', newItem, event);
    }
  }
}
