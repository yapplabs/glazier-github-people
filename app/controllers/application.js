var ApplicationController = Ember.ObjectController.extend({
  loggedIn: Ember.computed.bool('user'),
  title: function(){
    return "Github People for " + this.get('repositoryName');
  }.property('repositoryName'),
  personInputValue: null
});

export default ApplicationController;
