var alias = Ember.computed.alias;

var ApplicationController = Ember.ObjectController.extend({
  needs: ['cardMetadata', 'people'],
  cardDataStore: null,
  user: alias('cardDataStore.user'),
  userDidChange: function() {
    this.send('currentUserChanged', this.get('user'));
  }.observes('user'),
  repositoryName: alias('cardDataStore.repositoryName'),
  defaultTitle: function() {
    return "Github People for " + this.get('repositoryName');
  }.property('repositoryName'),
  title: function() {
    var title = this.get('cardDataStore.paneEntries.title');
    var defaultTitle = this.get('defaultTitle');
    return title || defaultTitle;
  }.property('defaultTitle', 'cardDataStore.paneEntries.title'),
  personInputValue: null,

  people: alias('controllers.people'),
  isEditing: false,
  // set by the view when sortable changes
  orderedLogins: null
});

export default ApplicationController;
