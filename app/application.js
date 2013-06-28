import 'resolver' as Resolver;
import 'app/router' as Router;

var App = Ember.Application.create({
  modulePrefix: 'app',
  rootElement: '#card',
  resolver: Resolver,
  Router: Router
});

App.deferReadiness();
requireModule('templates');

export = App;
