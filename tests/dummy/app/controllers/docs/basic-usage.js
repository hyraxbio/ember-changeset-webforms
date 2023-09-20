import ApplicationController from '../application';

export default ApplicationController.extend({
  get formSchema() {
    return this.loginFormSchema;
  },
});
