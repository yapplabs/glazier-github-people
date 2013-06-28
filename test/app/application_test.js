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
    Ember.Application.initializer({
      name: "consumers",
      initialize: function(container, application) {
        container.register('consumer:identity', identityConsumer, { instantiate: false });
        container.register('consumer:repository', repositoryConsumer, { instantiate: false });
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
  expect(2);
  App.then(function(){
    return visit("/").then(function() {
      ok(true, "Loaded");
    });
  }).then(function(){
    debugger;
    return click("Edit");
  }).then(function(){
    debugger;
    ok(true, "Visited Edit");
  });
});
