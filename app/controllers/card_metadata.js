var CardMetadataController = Ember.Controller.extend({
  cardDataStore: null,
  content: function(){
    return {
      isEditable: !!this.get('cardDataStore.isAdmin')
    }
  }.property('cardDataStore.isAdmin'),
  contentDidChange: function(){
    this.container.lookup('consumer:metadataUpdate').send('updateMetadata', { bucket: 'card', data: this.get('content') });
  }.observes('content')
});

export default CardMetadataController;
