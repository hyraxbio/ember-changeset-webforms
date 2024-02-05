import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/interpolated-simple-js-snippet';

@templateLayout(layout)
export default class InterpolatedSimpleJsSnippet extends Component {
  @computed('object', 'excludeKeys')
  get string() {
    if (!this.object) {
      return;
    }
    const object = { ...this.object };
    (this.excludeKeys || []).forEach((key) => {
      delete object[key];
    });
    const json = JSON.stringify(object || {}, null, 2);
    return json
      .split('\n')
      .map((line) => {
        if (line.indexOf(':') < 0) {
          return line;
        }
        const parts = line.split(':');
        return `${parts[0].replace(/"/g, ``)}: ${parts[1].replace(/"/g, `'`)}`;
      })
      .join('\n');
  }
}
