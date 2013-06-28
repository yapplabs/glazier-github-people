import 'conductor' as Conductor;

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
  retrievePeople: function(){
    var repositoryConsumer = this.get('repositoryConsumer');
    var route = this;
    return repositoryConsumer.request('getCurrentRepositoryName').then(function(repositoryName) {
      return {
        repositoryName: repositoryName,
        people: route.controllerFor('people')
      };
    }).then(null, Conductor.error);
  }
});

export = ApplicationRoute;
