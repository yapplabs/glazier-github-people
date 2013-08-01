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
    'remoteEmberObject': Conductor.Oasis.Consumer.extend({
      controllers: ['cardMetadata'],
      updateData: function(bucketName, data) {
        this.send('updateData', { bucket: bucketName, data: data });
      },
      requests: {
        getBucketData: function(bucketName) {
          if (this.controllers.indexOf(bucketName) === -1) {
            throw new Error('Invalid bucket name ' + bucketName);
          } else {
            // FUTURE: maybe have the bucket-backing objects registered as bucket: types
            var controller = this.container.lookup('controller:' + bucketName);
            return controller.getBucketData();
          }
        }
      }
    })
  },

  render: function (intent, dimensions) {
    if (intent === 'edit') {
      App.__container__.lookup('router:main').send('edit');
    } else {
      document.body.innerHTML = "<div id=\"card\"></div>";
      Ember.run(App, 'advanceReadiness');
      return App;
    }
  },

  activate: function(data) {
    Conductor.Oasis.configure('eventCallback', Ember.run);
    var Application = requireModule('app/application');
    window.App = Application.create({
      ready: function(){
        // var cardMetadataController = this.__container__.lookup('controller:cardMetadata');
        // card.metadata.card = function(){
        //   return cardMetadataController.get('content');
        // };
        // cardMetadataController.contentDidChange();
      }
    });
    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  },

  metadata: {
    document: function() {
      return {
        title: "Github People"
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
