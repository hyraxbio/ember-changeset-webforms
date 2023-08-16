import Component from '@ember/component';
import layout from '../../templates/components/background/markdown-to-html';
import MarkdownIt from 'markdown-it';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});

export default Component.extend({
  layout,
  tagName: '',
  classNames: 'markdown',

  html: computed('source', function () {
    return htmlSafe(md.renderInline(this.source));
  }),
});
