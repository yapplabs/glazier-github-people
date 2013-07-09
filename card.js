import Consumer from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('card.css');

import TestConsumer from 'app/consumers/test';

var card = Conductor.card({
  consumers: {
    'test': TestConsumer,
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedGithubApi': Conductor.Oasis.Consumer,
    'unauthenticatedGithubApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    document.body.innerHTML = "<div id=\"card\"></div>";

    Ember.run(App, 'advanceReadiness');

    return App;
  },

  dataDidChange: function(bucket, value) {
    var data;

    if (bucket === '*') {
      data = value;
    } else {
      data = {};
      data[bucket] = value;
    }

    var controller = App.__container__.lookup('store:cardData');

    controller.setProperties(data);
  },

  activate: function(data) {
    var Application = requireModule('app/application');

    Application.initializer({
      name: 'initializeCardDataStore',
      after: 'registerCardDataStore',
      initialize: function(container, application) {
        card.dataDidChange('*', card.data);
      }
    });

    window.App = Application.create();
    App.deferReadiness();

    Ember.keys(this.consumers).forEach(function(name){
      App.register('consumer:' + name, this.consumers[name], { instantiate: false });
    }, this);
  },

  didUpdateData: function(bucket, data) {
    this.dataDidChange(bucket, data);
  },

  metadata: {
    document: function(promise) {
      promise.resolve({
        title: "Github People"
      });
    }
  },

  resize: function(dimensions) {
    var width = Math.min(dimensions.width, 500);
    var height = Math.min(dimensions.height, 500);

    $('body>div').css({
      width: width
    });
  }
});

export default card;

