var IndexController = Ember.Controller.extend({
  cardDataStore: null,
  canEdit: Ember.computed.alias('cardDataStore.isAdmin')
});

export default IndexController;
