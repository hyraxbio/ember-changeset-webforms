import Component from '@ember/component';
import layout from '../templates/components/form-submit-button';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['submit-input-container', 'spinner-container', 'large'],
  classNameBindings: ['requestInFlight:spin', 'classes'],
  attributeBindings: ['customType:type', 'data-test-id'],
  customType: 'submit'
});