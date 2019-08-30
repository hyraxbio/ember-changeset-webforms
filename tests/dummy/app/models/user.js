import DS from 'ember-data';

export default DS.Model.extend({
  accept_terms: DS.attr('boolean'),
  bio: DS.attr('string'),
  email: DS.attr('string'),
  favourite_colours: DS.attr(),
  gender: DS.attr('string'),
  info: DS.attr(),
  name: DS.attr('string'),
  password: DS.attr('string'),
  password_confirmation: DS.attr('string')
});
