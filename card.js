import Consumer from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/jquery-sortable.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/resolver.js');

Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import TestConsumer from 'app/consumers/test';
import RemoteEmberObjectConsumer from 'app/consumers/remote_ember_object';
RemoteEmberObjectConsumer.controllers = ['cardMetadata'];

var card = Conductor.card({
  App: null,
  consumers: {
    'test': TestConsumer,
    'adminStorage': Conductor.Oasis.Consumer,
    'remoteEmberObject': Conductor.Oasis.Consumer.extend(RemoteEmberObjectConsumer),
    'authenticatedGithubApi': Conductor.Oasis.Consumer,
    'unauthenticatedGithubApi': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (!document.getElementById('card')) {
      document.body.innerHTML = "<div id=\"card\"></div>";
    }

    return this.App.render(intent, dimensions);
  },

  activate: function(data) {
    var Application = require('app/application');
    window.App = this.App = Application.create();
    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  },

  metadata: {
    document: function() {
      return {
        title: "Github People"
      };
    }
  }
});

export default card;
