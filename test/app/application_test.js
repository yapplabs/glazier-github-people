Ember.testing = true;
import 'app/application' as App;
import 'card' as card;
debugger;

module('github-people Application', {
  setup: function() {
    debugger;
    $('#qunit-fixture').append('<div id="card"></div>');
    Ember.run(App, App.advanceReadiness);
    App.injectTestHelpers();
  },
  teardown: function() {
    App.reset();
  }
});

test("first test", function(){
  expect(1);
  visit("/").then(function() {
    ok(true, "Woot!");
  });
});
