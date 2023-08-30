import { tracked } from '@glimmer/tracking';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('')
export default class SvgIconBase extends Component {
  @tracked vectorEffect;

  get computedVectorEffect() {
    return this.vectorEffect || 'non-scaling-stroke';
  }
}
