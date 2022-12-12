import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() { 
    this.route('basic-usage');
    this.route('configuration-options');
    this.route('creating-custom-fields');
    this.route('action-handling');
    this.route('field-validation');
    this.route('integrating-custom-validators');
    this.route('clonable-form-fields');
    this.route('built-in-fields');
    this.route('configure-classnames');
  });
  this.route('not-found', { path: '/*path' });


});

export default Router;