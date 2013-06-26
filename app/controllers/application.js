var ApplicationController = Ember.ObjectController.extend({
  loggedIn: Ember.computed.bool('user'),
  people: []
});

export = ApplicationController;
