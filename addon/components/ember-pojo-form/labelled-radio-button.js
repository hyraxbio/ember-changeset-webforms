import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/labelled-radio-button';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['labelled-radio-button'],
  classNameBindings: ['disabled:disabled'],
});