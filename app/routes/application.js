import send from 'app/utils/send';

var ApplicationRoute = Ember.Route.extend({
  events: {
    renderEdit: send('edit'),
    edit: function() {
      this.transitionTo('edit');
    },
    renderDefault: Ember.K,
    currentUserChanged: Ember.K
  }
});

export default ApplicationRoute;
