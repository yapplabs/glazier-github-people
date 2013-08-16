var alias = Ember.computed.alias;

var ApplicationView = Ember.View.extend({
  editingChanged: function() {
    var view = this;
    if (this.get('controller.isEditing')) {
      this.set('hasSortable', true);
      this.$('.people').sortable().on('sortupdate', function() {
        view.propertyWillChange('orderedLogins');
        view.propertyDidChange('orderedLogins');
      });
    } else {
      if (this.get('hasSortable')) {
        this.$('.people').sortable('destroy');
        this.set('hasSortable', false);
      }
    }
  }.observes('controller.isEditing'),

  orderedLogins: function(){
    return this.$('.person').map(function(){
      return this.attributes['data-user-login'].value;
    }).toArray();
  }.property(),

  orderedLoginsChanged: function() {
    this.set('controller.orderedLogins', this.get('orderedLogins'));
  }.observes('orderedLogins')

});

export default ApplicationView;
