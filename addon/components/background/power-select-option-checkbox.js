import Component from '@glimmer/component';

export default class PowerSelectOptionCheckbox extends Component {
  get isSelected() {
    return (this.args.selected || []).includes(this.args.option);
  }
}
