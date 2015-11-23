Anapa.TodoController = Ember.ObjectController.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
        if(sys.getNode(this.get('model').get('id'))){
          sys.renderer.redraw();
        }
      }
    },
    removeTodo: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
      if(sys.getNode(todo.id)){
        sys.pruneNode(todo.id);
      }
    }
  },

  isEditing: false,

  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      // Update the graph. TODO: graph should reference entire model object
      if(sys.getNode(model.id)){
        sys.getNode(model.id).data['completed'] = value;
        sys.renderer.redraw();
      }
      return value;
    }
  }.property('model.isCompleted')
});