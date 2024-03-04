import Component from '@glimmer/component';

export default class InterpolatedSimpleJsSnippet extends Component {
  get string() {
    if (!this.args.object) {
      return null;
    }
    const object = { ...this.args.object };
    (this.args.excludeKeys || []).forEach((key) => {
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
