Anapa.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  froms: DS.hasMany('todo', {inverse: 'tos'}),
  tos: DS.hasMany('todo', {inverse: 'froms'})
});