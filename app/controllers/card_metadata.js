import RemoteEmberObjectMixin from 'glazier/remote-ember-object-mixin';

var CardMetadataController = Ember.Controller.extend(RemoteEmberObjectMixin, {
  needs: ['application'],
  cardDataStore: null, //injected
  publishedProperties: [
    'isEditable',
    'isEditing',
    'toolbar',
    'title'
  ],
  isEditable: Ember.computed.bool('cardDataStore.isAdmin'),
  title: Ember.computed.alias('controllers.application.title'),

  // TODO: megahacks
  toolbar: Ember.computed.alias('_toolbar'),
  _toolbar: Ember.A([]),

  toolbarDidChange: function(){
    Ember.run.once(this, 'notifyToolbarChange');
  }.observes('_toolbar.@each.text', '_toolbar.@each.icon'),

  notifyToolbarChange: function(){
    this.notifyPropertyChange('toolbar');
  }
});

// ToolBarItem = Ember.Object.extend({
//   text: function(){
//     var length = this.get('length');
//     return "" + length + " people";
//   }.property('length')
// });

export default CardMetadataController;
