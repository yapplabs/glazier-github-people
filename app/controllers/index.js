var IndexController = Ember.Controller.extend({
  needs: ['user'],
  canEdit: Ember.computed.alias('controllers.user.canEdit')
});

export = IndexController;
