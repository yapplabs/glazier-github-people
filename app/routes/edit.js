import send from 'app/utils/send';

var EditRoute = Ember.Route.extend({
  activate: function(){
    this.controllerFor('application').set('isEditing', true);
  },
  deactivate: function(){
    this.controllerFor('application').set('isEditing', false);
  },
  setupController: function(controller, model) {
    controller.set('title', this.controllerFor('application').get('title'));
  },
  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),

  saveTitle: function() {
    var title = this.controller.get('title');
    this.controllerFor('application').set('title', title);
    this.get('adminStorageConsumer').request('setItem', 'title', title);
  },
  updatePeopleOrdering: function() {
    var orderedLogins = this.controllerFor('application').get('orderedLogins');
    if (orderedLogins) {
      this.get('adminStorageConsumer').request('setItem', 'people', orderedLogins);
    }
    this.controller.set('orderedLogins', null);
  },
  actions: {
    renderDefault: send('doneEditing'),
    doneEditing: function() {
      this.saveTitle();
      this.updatePeopleOrdering();
      this.transitionTo('index');
    },
    currentUserChanged: function() {
      this.transitionTo('index');
    },
    addPerson: function() {
      var login = Ember.$.trim(this.controller.get('personInputValue'));
      var peopleController = this.controllerFor('people');
      if (login) {
        peopleController.addPerson(login);
      }
      this.controller.set('personInputValue', null);
    }
  }
});

export default EditRoute;
