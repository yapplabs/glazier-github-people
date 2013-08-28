var PeopleController = Ember.ArrayController.extend({
  needs: ['application'],
  cardDataStore: null,

  content: function() {
    var list = [];
    var logins = this.get('cardDataStore.paneEntries.people') || [];
    logins.forEach(function(login) {
      var userHash = this.get('cardDataStore.paneEntries.login:' + login);
      list.push(userHash);
    }, this);
    return list;
  }.property('cardDataStore.paneEntries'),

  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),

  authenticatedGithubApiConsumer: function(){
    return this.container.lookup('consumer:authenticatedGithubApi');
  }.property(),

  isEditing: Ember.computed.alias('controllers.application.isEditing'),

  addPerson: function(login) {
    var githubService = this.get('authenticatedGithubApiConsumer');
    var adminStorageService = this.get('adminStorageConsumer');
    var peopleController = this;

    githubService.request("ajax", {
      url: '/users/' + login,
      dataType: 'json'
    }).then(function(userHash) {
      peopleController.pushObject(userHash);

      return adminStorageService.request('setItem', 'login:' + login, userHash).then(function() {
        var logins = peopleController.mapProperty('login');
        return adminStorageService.request('setItem', 'people', logins);
      });
    }).then(null, Conductor.onerror);
  },

  removePerson: function(person) {
    var githubService = this.get('authenticatedGithubApiConsumer');
    var adminStorageService = this.get('adminStorageConsumer');
    var peopleController = this;

    peopleController.removeObject(person);
    var logins = peopleController.mapProperty('login');

    return adminStorageService.request('setItem', 'people', logins).then(function() {
      return adminStorageService.request('removeItem', 'login:' + person.login);
    });
  }
});

export default PeopleController;
