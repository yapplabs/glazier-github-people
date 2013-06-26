var ApplicationController = Ember.ObjectController.extend({
  loggedIn: Ember.computed.bool('user'),
  title: function(){
    return "Github People for " + this.get('repositoryName');
  }.property('repositoryName'),
  people: [],
  personInputValue: null,
  addPerson: function(){
    //TODO: retrieve user info from github API, persist it, and add it to the people array
    this.get('people').pushObject({ login: this.get('personInputValue') });
    this.set('personInputValue', null);
  },
  canAddPerson: true //TODO: based on repository editing permissions
});

export = ApplicationController;
