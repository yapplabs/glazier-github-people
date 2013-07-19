var alias = Ember.computed.alias;

var ApplicationController = Ember.ObjectController.extend({
  cardDataStore: null,
  repositoryName: alias('cardDataStore.repositoryName'),
  defaultTitle: function() {
    return "Github People for " + this.get('repositoryName');
  }.property('repositoryName'),
  title: function() {
    var title = this.get('cardDataStore.paneEntries.title');
    var defaultTitle = this.get('defaultTitle');
    return title || defaultTitle;
  }.property('defaultTitle', 'cardDataStore.paneEntries.title'),
  personInputValue: null
});

export default ApplicationController;
