var PeopleController = Ember.ArrayController.extend({
  content: [],

  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),

  authenticatedGithubApiConsumer: function(){
    return this.container.lookup('consumer:authenticatedGithubApi');
  }.property(),

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
  }
});

export default PeopleController;
