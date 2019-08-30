import { Response } from 'ember-cli-mirage';

export default function() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  // this.namespace = 'api';

  this.get('/users', (schema) => {
    return schema.all('user');
  });

  this.get('/users/:id', function(schema, request) {
    return schema.find('user', request.params.id);
  });

  this.post('/users', ({ users }, request) => {
    let attrs = JSON.parse(request.requestBody);
    // let attrs = JSON.parse(request.requestBody).data.attributes;
    if (attrs.email === 'alreadytaken@yahoo.com') {
      return new Response(400, {some: 'header'}, {errors: ['Email already taken.']});
    } else {
      return users.create(attrs);
    }
  });

  this.patch('/users/:id', function({ users }, request) {
    let id = request.params.id;
    let attrs = this.normalizedRequestAttrs();
    return users.find(id).update(attrs);
  });
}
