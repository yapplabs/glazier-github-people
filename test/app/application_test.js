Ember.testing = true;
import 'app/application' as Application;

module('github-people Application', {
  setup: function() {
    var stubUser = { login: 'foo' };
    var identityConsumer = {
      request: function(requestName){
        if (requestName === 'currentUser') {
          return Ember.RSVP.resolve(stubUser);
        }
      }
    };
    var repositoryConsumer = {
      request: function(requestName){
        if (requestName === 'getCurrentRepositoryName') {
          return Ember.RSVP.resolve("foorepo");
        }
      }
    };
    var authenticatedGithubApiConsumer = {
      request: function(requestName, options) {
        if (requestName === 'ajax') {
          return Ember.RSVP.resolve({
            "login": "raycohen",
            "id": 20404,
            "avatar_url": "https://secure.gravatar.com/avatar/a9ab55d6eaf07a5238f28fdd8959393f?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
            "gravatar_id": "a9ab55d6eaf07a5238f28fdd8959393f",
            "url": "https://api.github.com/users/raycohen",
            "html_url": "https://github.com/raycohen",
            "followers_url": "https://api.github.com/users/raycohen/followers",
            "following_url": "https://api.github.com/users/raycohen/following{/other_user}",
            "gists_url": "https://api.github.com/users/raycohen/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/raycohen/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/raycohen/subscriptions",
            "organizations_url": "https://api.github.com/users/raycohen/orgs",
            "repos_url": "https://api.github.com/users/raycohen/repos",
            "events_url": "https://api.github.com/users/raycohen/events{/privacy}",
            "received_events_url": "https://api.github.com/users/raycohen/received_events",
            "type": "User",
            "name": "Ray Cohen",
            "company": "",
            "blog": "",
            "location": "NYC",
            "email": null,
            "hireable": false,
            "bio": null,
            "public_repos": 19,
            "followers": 12,
            "following": 22,
            "created_at": "2008-08-12T14:55:30Z",
            "updated_at": "2013-06-27T21:49:17Z",
            "public_gists": 5
          });
        }
      }
    };
    Ember.Application.initializer({
      name: "consumers",
      initialize: function(container, application) {
        container.register('consumer:identity', identityConsumer, { instantiate: false });
        container.register('consumer:repository', repositoryConsumer, { instantiate: false });
        container.register('consumer:authenticatedGithubApi', authenticatedGithubApiConsumer, { instantiate: false });
      }
    });
    Ember.run(function(){
      window.App = Application.create();
      App.deferReadiness();
      App.setupForTesting();
      App.injectTestHelpers();
    });
    $('#qunit-fixture').append('<div id="card"></div>');
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test("first test", function(){
  expect(3);
  var testPromise = App.then(function(){
    return visit("/").then(function() {
      ok(true, "Loaded");
    });
  }).then(function(){
    return click("a[href='/edit']");
  }).then(function(){
    ok(true, "Visited Edit");

    return fillIn(".github-login", "raycohen").click(".add-person-button");
  }).then(function() {
    ok(Em.$.trim(find('.person').text()) === 'raycohen', "Displays user Info")
    debugger;
  });

  testPromise.then(null, function(reason) {
    console.error(reason);
  });
});
