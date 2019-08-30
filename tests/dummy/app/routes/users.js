import Route from '@ember/routing/route';


export default Route.extend({
  model() {
    return this.store.findAll('user');
  },

  actions: {
    addUser() {
      var values = {
        name: 'test',
        email: 'test@gmail.com'
      };
      this.send('saveNewRecord', values, 'user').then(response => {
        console.log(response);
      });
    }
  }
});
