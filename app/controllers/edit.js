var EditController = Em.Controller.extend({
  needs: ['people'],
  authenticatedGithubApiConsumer: function(){
    return this.container.lookup('consumer:authenticatedGithubApi');
  }.property(),

  addPerson: function(){
    //TODO: retrieve user info from github API, persist it, and add it to the people array
    var login = this.get('personInputValue');
    var service = this.get('authenticatedGithubApiConsumer');
    var peopleController = this.get('controllers.people');

    service.request("ajax", {
      url: '/users/' + login,
      dataType: 'json'
    }).then(function(userHash) {
      debugger;
      peopleController.pushObject(userHash);
    }).then(null, Conductor.onerror);

    this.set('personInputValue', null);
  }
});

export = EditController;
