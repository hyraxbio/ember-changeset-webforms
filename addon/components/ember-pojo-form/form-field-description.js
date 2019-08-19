import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-description';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNames: ['field-description']
});
