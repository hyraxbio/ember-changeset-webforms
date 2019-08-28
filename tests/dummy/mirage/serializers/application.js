import { JSONAPISerializer } from 'ember-cli-mirage';
import EmberObject from '@ember/object';

export default JSONAPISerializer.extend({
  
  alwaysIncludeLinkageData: true,

  // serialize(object, request) {
  //   console.log(object);
  //   console.log(request);
  //   // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
  //   let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

  //   // Serialize the data into what Ember data would return as the model.
  //   console.log(json);
  //   return json.data.map(item => {
  //     var object = EmberObject.create(item.attributes);
  //     object.set('id', item.id);
  //     return object;
  //   });
  // },
  
  keyForAttribute(key) {
    return key;
  },

  keyForRelationship(key) {
    return key;
  },
});
