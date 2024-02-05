import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});
export default class MarkdownToHtml extends Component {
  @tracked source;

  get html() {
    return htmlSafe(md.renderInline(this.args.source));
  }
}
