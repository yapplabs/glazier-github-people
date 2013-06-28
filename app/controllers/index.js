var IndexController = Ember.Controller.extend({
  needs: ['user'],
  canEdit: Em.computed.alias('controllers.user.canEdit')
});

export = IndexController;
