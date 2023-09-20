import { tracked } from '@glimmer/tracking';
import { tagName } from '@ember-decorators/component';
import Component from '@glimmer/component';

@tagName('')
export default class SvgIconBase extends Component {
  @tracked vectorEffect;

  get computedVectorEffect() {
    return this.args.vectorEffect || 'non-scaling-stroke';
  }
}
