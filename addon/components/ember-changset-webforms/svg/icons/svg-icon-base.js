import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@tagName('')
export default class SvgIconBase extends Component {
  @computed('vectorEffect')
  get computedVectorEffect() {
    return this.vectorEffect || 'non-scaling-stroke';
  }
}
