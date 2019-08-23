import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  model() {
    return $.ajax({
      url: '/api/users/1'
    }).then(response => {
      var model = response.data.attributes;
      model.id = response.data.id;
      return model;
    });
  },
});
