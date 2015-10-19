Anapa.Router.map(function() {
  this.resource('todos', { path: '/' }, function () {
    // child routes here
    this.route('active');
    this.route('completed');
  });
});

Anapa.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Anapa.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Anapa.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});