import RemoteEmberObjectMixin from 'glazier/remote-ember-object-mixin';

var CardMetadataController = Ember.Controller.extend(RemoteEmberObjectMixin, {
  cardDataStore: null, //injected
  publishedProperties: [
    'isEditable',
    'isEditing'
  ],
  isEditable: Ember.computed.bool('cardDataStore.isAdmin')
});

export default CardMetadataController;
