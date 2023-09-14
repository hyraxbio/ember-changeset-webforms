import { tracked } from '@glimmer/tracking';
import {
  classNames,
  layout as templateLayout,
  tagName,
} from '@ember-decorators/component';
import Component from '@glimmer/component';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});

@classNames('markdown')
export default class MarkdownToHtml extends Component {
  @tracked source;

  get html() {
    return htmlSafe(md.renderInline(this.source));
  }
}
