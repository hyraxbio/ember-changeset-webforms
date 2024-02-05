import { layout as templateLayout } from '@ember-decorators/component';
import PowerSelectSelectedItem from './power-select-selected-item-component';
import layout from '../../templates/components/forms/power-select-option-component';

@templateLayout(layout)
export default class PowerSelectOptionComponent extends PowerSelectSelectedItem {}
