import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('signup');
  this.route('users');
  this.route('edit-account');
  this.route('user');

  this.route('public-pages', { path: '' }, function() {
    this.route('docs', function() {
      this.route('introduction');
    });
  });
});

export default Router;
