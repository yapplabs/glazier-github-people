var Router = Ember.Router.extend();

Router.map(function(){
  this.route('edit');
});

Router.router.log = Ember.Logger.debug;

export default Router;
