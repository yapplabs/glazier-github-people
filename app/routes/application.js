var ApplicationRoute = Ember.Route.extend({
  events: {
    edit: function() {
      this.transitionTo('edit');
    }
  }
});

export default ApplicationRoute;
