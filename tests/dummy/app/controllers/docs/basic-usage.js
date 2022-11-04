import ApplicationController from '../application';
import { alias } from '@ember/object/computed';

export default ApplicationController.extend({
  formSchema: alias('loginFormSchema')
});
