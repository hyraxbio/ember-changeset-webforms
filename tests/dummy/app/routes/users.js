import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  model() {
    return $.ajax({
      url: '/api/users'
    }).then(response => {
      return response;
    });
  },
});
