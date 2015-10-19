Anapa.TodosController = Ember.ArrayController.extend({
  actions: {
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
      sys.addNode(todo.id, {model: this});
      // sys.addEdge('origin', todo.id)

      todo.get('tos').map(function(item, index){
        Ember.Logger.info(item);
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
      return value;
    }
  }.property('@each.isCompleted'),

  remaining: function () {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function () {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
});
