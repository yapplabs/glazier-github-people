var IndexController = Ember.Controller.extend({
  cardDataStore: null,
  needs: ['user'],
  canEdit: Ember.computed.alias('controllers.user.canEdit')
});

export default IndexController;
