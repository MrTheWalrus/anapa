Anapa.TodosController = Ember.ArrayController.extend({
  actions: {
    drawNodes: function() {
      var nodeList = this.store.all('todo');
      nodeList.forEach(function(n){
        // TODO: This should probably be model
        sys.addNode(n.id, {model: n})
        n.get('tos').forEach(function(a){
          sys.addEdge(n.id, a.get('id'));
        });
      })
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // For now, attach as 'to' every completed item
      todo.get('tos').pushObjects(this.filterBy('isCompleted', true));

      // Save the new model
      todo.save();

      // Draw a node for the new model
      sys.addNode(todo.id, {model: todo});
      // sys.addEdge('origin', todo.id)

      todo.get('tos').map(function(item, index){
        sys.addEdge(todo.id, item.get('id'));
      });

    }
  },
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.isEvery('isCompleted');
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      sys.renderer.redraw();
      return value;
    }
  }.property('@each.isCompleted'),

});
