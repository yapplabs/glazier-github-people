var alias = Ember.computed.alias;

var ApplicationController = Ember.ObjectController.extend({
  cardDataStore: null,
  repositoryName: alias('cardDataStore.repositoryName'),
  title: function(){
    return "Github People for " + this.get('repositoryName');
  }.property('repositoryName'),
  personInputValue: null
});

export default ApplicationController;
