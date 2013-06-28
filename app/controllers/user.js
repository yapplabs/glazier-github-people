var UserController = Ember.ObjectController.extend({
  needs: ['application'],
  repositoryName: Ember.computed.alias('controllers.application.repositoryName'),
  canEdit: function(){
    var editableRepositories = this.get('editableRepositories'),
        repositoryName = this.get('repositoryName');
    return editableRepositories.indexOf(repositoryName) !== -1;
  }.property('editableRepositories', 'repositoryName')
});

export = UserController;
