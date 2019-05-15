import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-submit-button';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: 'button',
  emberPojoFormsService: service(),
  classNames: ['form-submit-button'],
  classNameBindings: ['requestInFlight:request-in-flight', 'classes'],
  attributeBindings: ['customType:type', 'data-test-id'],
  customType: 'button'
});