import { tracked } from '@glimmer/tracking';
import {
  classNames,
  layout as templateLayout,
  tagName,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/background/markdown-to-html';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});

@templateLayout(layout)
@tagName('')
@classNames('markdown')
export default class MarkdownToHtml extends Component {
  @tracked source;

  get html() {
    return htmlSafe(md.renderInline(this.source));
  }
}
