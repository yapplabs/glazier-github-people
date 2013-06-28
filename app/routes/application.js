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
    debugger;
    var route = this,
        identityConsumer = this.get('identityConsumer');
    return identityConsumer.request("currentUser").then(function(user){
      return route.retrievePeople(user);
    });
  },
  retrievePeople: function(){
    var repositoryConsumer = this.get('repositoryConsumer');
    return repositoryConsumer.request('getCurrentRepositoryName').then(function(repositoryName) {
      // TODO: get people info
      return {
        repositoryName: repositoryName
      };
    }).then(null, Conductor.error);
  }
});

export = ApplicationRoute;
