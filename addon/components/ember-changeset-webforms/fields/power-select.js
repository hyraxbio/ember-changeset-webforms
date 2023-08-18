import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/fields/power-select';
import { typeOf as emberTypeOf } from '@ember/utils';

@templateLayout(layout)
@tagName('')
export default class PowerSelect extends Component {
  @computed('formField.allowClear')
  get allowClear() {
    if (this.formField.allowClear === false) {
      return false;
    } else {
      return true;
    }
  }

  @computed('formField.multipleSelection')
  get componentName() {
    return this.formField.multipleSelection
      ? 'power-select-multiple'
      : 'power-select';
  }

  @action
  onChangeAction(formField, value, _selectComponent, event) {
    if ((value || []).length === 0) {
      value = null;
    }
    this.onChange(formField, value);
    this.onUserInteraction(formField, value, 'optionSelected', event);
  }

  @action
  onKeydown(formField, dropdown, event) {
    const primitiveOptions = dropdown.options.map((option) => {
      if (
        emberTypeOf(option) === 'object' &&
        this.formField.optionDisplayProp
      ) {
        return option[this.formField.optionDisplayProp];
      } else {
        return option;
      }
    });
    if (event.keyCode === 13) {
      event.preventDefault();
      if (
        this.formField.multipleSelection &&
        formField.allowFreeTyping &&
        !primitiveOptions.find(
          (primitiveOption) =>
            primitiveOption
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) > -1
        )
      ) {
        let value = this.displayValue || [];
        var newItem;
        if (this.formField.optionDisplayProp) {
          newItem = {};
          newItem[this.formField.optionDisplayProp] = event.target.value;
        } else {
          newItem = event.target.value;
        }
        value.push(newItem);
        this.onUserInteraction(
          formField,
          newItem,
          'keyDownEnterPowerSelectMultiple',
          event
        );
        this.onChange(formField, value, 'keyDownPowerSelect', event);
      }
      this.onUserInteraction(formField, newItem, 'keyDownPowerSelect', event);
    }
  }
}
