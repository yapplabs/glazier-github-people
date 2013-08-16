var alias = Ember.computed.alias;

var ApplicationController = Ember.ObjectController.extend({
  needs: ['cardMetadata', 'people'],
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
  personInputValue: null,

  people: alias('controllers.people'),
  // used by application view to know when to allow sorting
  isEditing: alias('controllers.cardMetadata.isEditing'),
  // set by the view when sortable changes
  orderedLogins: null
});

export default ApplicationController;
