import Consumer from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import TestConsumer from 'app/consumers/test';

var card = Conductor.card({
  consumers: {
    'test': TestConsumer,
    'adminStorage': Conductor.Oasis.Consumer,
    'authenticatedGithubApi': Conductor.Oasis.Consumer,
    'unauthenticatedGithubApi': Conductor.Oasis.Consumer,
    'metadataUpdate': Conductor.Oasis.Consumer
  },

  render: function (intent, dimensions) {
    if (intent === 'edit') {
      App.__container__.lookup('router:main').send('edit');
    } else {

    }
    document.body.innerHTML = "<div id=\"card\"></div>";
    Ember.run(App, 'advanceReadiness');
    return App;
  },

  activate: function(data) {
    Conductor.Oasis.configure('eventCallback', Ember.run);
    var Application = requireModule('app/application');
    window.App = Application.create({
      ready: function(){
        var cardMetadataController = this.__container__.lookup('controller:cardMetadata');
        card.metadata.card = function(){
          return cardMetadataController.get('content');
        };
        cardMetadataController.contentDidChange();
      }
    });
    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
    Ember.keys(Object.getPrototypeOf(this.consumers)).forEach(function(name){
      App.register('consumer:' + name, this.consumers[name], { instantiate: false });
    }, this);
  },

  metadata: {
    document: function() {
      return {
        title: "Github People"
      };
    },
    card: function(){
      return {
        isEditable: false
      };
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
