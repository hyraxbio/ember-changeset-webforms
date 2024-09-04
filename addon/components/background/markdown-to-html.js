import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';

const md = new MarkdownIt({});
export default class MarkdownToHtml extends Component {
  @tracked source;

  get html() {
    const element = document.createElement('div');
    element.innerHTML = md.renderInline(this.args.source);
    var links = element.querySelectorAll('a');
    for (var link of Array.from(links)) {
      if (
        link.hostname !== window.location.hostname &&
        !link.getAttribute('href').startsWith('#')
      ) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }
    return htmlSafe(element.innerHTML);
  }
}
