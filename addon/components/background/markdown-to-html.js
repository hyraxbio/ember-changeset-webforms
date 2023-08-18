import { classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/background/markdown-to-html';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});

@templateLayout(layout)
@tagName('')
@classNames('markdown')
export default class MarkdownToHtml extends Component {
  @computed('source')
  get html() {
    return htmlSafe(md.renderInline(this.source));
  }
}
