import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return $.ajax({
      url: '/api/users/1'
    }).then(response => {
      console.log(response);
      return response.data.attributes;
    });
  },
});
