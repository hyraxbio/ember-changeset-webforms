import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  model() {
    return $.ajax({
      url: '/api/users'
    }).then(response => {
      return response.data.map(item => {
        var obj = item.attributes;
        obj.id = item.id;
        return obj;
      });
    });
  },

  actions: {
    addUser() {
      var values = {
        name: 'test',
        email: 'test@gmail.com'
      };
      return $.ajax({
        url: '/api/users',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(values)
      }).done(response => {
        console.log(response);
        this.refresh();
      });
    }
  }
});
