import send from 'app/utils/send';

var EditRoute = Ember.Route.extend({
  activate: function(){ 
    this.controllerFor('cardMetadata').set('isEditing', true);
  },
  deactivate: function(){ 
    this.controllerFor('cardMetadata').set('isEditing', false);
  },
  setupController: function(controller, model) {
    controller.set('title', this.controllerFor('application').get('title'));
  },
  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),
  events: {
    renderDefault: send('doneEditing'),
    doneEditing: function() {
      this.transitionTo('index');
    },
    saveTitle: function() {
      var title = this.controller.get('title');
      this.controllerFor('application').set('title', title);
      this.get('adminStorageConsumer').request('setItem', 'title', title);
    },
    addPerson: function() {
      var login = this.controller.get('personInputValue');
      var peopleController = this.controllerFor('people');
      peopleController.addPerson(login);
      this.controller.set('personInputValue', null);
    }
  }
});

export default EditRoute;
