var UserController = Ember.ObjectController.extend({
 cardDataStore: null,
  content: Ember.computed.alias('cardDataStore.user'),
  isLoggedIn: Ember.computed.bool('model'),
  repositoryName: Ember.computed.alias('cardDataStore.repositoryName'),
  canEdit: function() {
    var editableRepositories = this.get('editableRepositories') || [],
        repositoryName = this.get('repositoryName');

    return editableRepositories.indexOf(repositoryName) !== -1;
  }.property('editableRepositories', 'repositoryName')
});

export default UserController;
