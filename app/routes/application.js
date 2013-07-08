import Conductor from 'conductor';

var ApplicationRoute = Ember.Route.extend({
  identityConsumer: function(){
    return this.container.lookup('consumer:identity');
  }.property(),
  repositoryConsumer: function(){
    return this.container.lookup('consumer:repository');
  }.property(),
  events: {
    currentUserChanged: function(user) {
      this.controller.set('user', user);
    }
  },
  model: function(){
    var route = this,
        identityConsumer = this.get('identityConsumer');
    return identityConsumer.request("currentUser").then(function(user){
      return route.retrievePeople(user);
    });
  },
  setupController: function(controller, model){
    this._super(controller, model);
    this.controllerFor('user').set('model', model.user);
  },
  retrievePeople: function(user){
    var repositoryConsumer = this.get('repositoryConsumer');
    var route = this;
    return repositoryConsumer.request('getCurrentRepositoryName').then(function(repositoryName) {
      return {
        repositoryName: repositoryName,
        people: route.controllerFor('people'),
        user: user
      };
    }).then(null, Conductor.error);
  }
});

export default ApplicationRoute;
