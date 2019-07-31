import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/form-field-power-datepicker';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',
  emberPojoForms: service(),
});
