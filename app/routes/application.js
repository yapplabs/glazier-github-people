import Conductor from 'conductor';
var RSVP = Ember.RSVP;

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
        identityConsumer = this.get('identityConsumer'),
        repositoryConsumer = this.get('repositoryConsumer');

    return RSVP.hash({
      user:  identityConsumer.request('currentUser'),
      repositoryName:  repositoryConsumer.request('getCurrentRepositoryName')
    });
  },
  setupController: function(controller, model){
    this._super(controller, model);
    this.controllerFor('user').set('model', model.user);
  }
});

export default ApplicationRoute;
