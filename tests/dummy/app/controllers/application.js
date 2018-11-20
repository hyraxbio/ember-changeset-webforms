import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setProperty: function(property, value) {
      this.set(property, value);
    },

    toggleProperty: function(property) {
      this.toggleProperty(property);
    },
  }
});
