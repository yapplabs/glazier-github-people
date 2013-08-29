import Resolver from 'resolver';
import Router from 'app/router';

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  Resolver: Resolver,
  Router: Router
});

requireModule('templates');

export default Application;
