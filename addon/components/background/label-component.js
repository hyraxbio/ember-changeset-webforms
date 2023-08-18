import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/background/label-component';

@templateLayout(layout)
@tagName('')
export default class LabelComponent extends Component {}
