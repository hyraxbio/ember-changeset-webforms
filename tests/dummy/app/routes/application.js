import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    saveNewRecord: function(values, modelName) {
      var record = this.store.createRecord(modelName, values);
      return record.save();
    },

    updateRecord: function(record) {
      return record.save();
    },
  }
});
