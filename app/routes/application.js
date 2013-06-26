import 'card' as card;
import 'conductor' as Conductor;

var Repo = {
  getCurrentRepositoryName: function(){
    return Ember.RSVP.resolve(card.consumers.repository.request('getRepository'));
  }
};

function retrievePeople(user) {
  return Repo.getCurrentRepositoryName().then(function(repositoryName) {
    // TODO: get people info
    return {
      repositoryName: repositoryName
    };
  }).then(null, Conductor.error);
}

var ApplicationRoute = Ember.Route.extend({
  events: {
    currentUserChanged: function(user) {
      this.controller.set('user', user);
    }
  },
  model: function(){
    return card.consumers.identity.request("currentUser").then(function(user){
      return retrievePeople(user);
    });
  }
});

export = ApplicationRoute;
