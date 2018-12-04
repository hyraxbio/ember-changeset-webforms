import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-submit-button';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['submit-input-container'],
  classNameBindings: ['requestInFlight:request-in-flight', 'classes'],
  attributeBindings: ['customType:type', 'data-test-id'],
  customType: 'button'
});