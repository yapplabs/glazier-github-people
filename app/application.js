import 'resolver' as Resolver;
import 'app/router' as Router;

var Application = Ember.Application.extend({
  modulePrefix: 'app',
  rootElement: '#card',
  resolver: Resolver,
  Router: Router
});

requireModule('templates');

export = Application;
