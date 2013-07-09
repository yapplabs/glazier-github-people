import Resolver from 'resolver';
import Router from 'app/router';

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  resolver: Resolver,
  Router: Router
});

Application.initializer({
  name: 'registerCardDataStore',
  initialize: function(container, application) {
    application.register('store:cardData', Ember.Object.extend());
    application.inject('controller', 'cardDataStore', 'store:cardData');
    application.inject('route', 'cardDataStore', 'store:cardData');
  }
});

requireModule('templates');

export default Application;
