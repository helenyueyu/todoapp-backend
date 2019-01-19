var ToDo = require('../models/todo.model')

_this = this

exports.getTodos = async function(query, page, limit){
  var options = {
    page,
    limit
  }
  try {
    var todos = await ToDo.paginate(query, options)
    return todos
  } catch(e) {
    throw Error('Error while paginating todos.')
  }
}

exports.createTodo = async function(todo){

  var newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  })

  try {
    var savedTodo = await newTodo.save()
    return savedTodo
  } catch(e) {
    throw Error('Error while creating todo.')
  }
}

exports.updateTodo = async function(todo){
  var id = todo.id
  try {
    var oldTodo = await ToDo.findById(id)
  } catch(e) {
    throw Error('Error occurred while finding the todo.')
  }

  if(!oldTodo) {
    return false
  }
  console.log(oldTodo)

  oldTodo.title = todo.title
  oldTodo.description = todo.description
  oldTodo.status = todo.status

  console.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo
  } catch(e) {
    throw Error('An error occurred updating the todo.')
  }
}

exports.deleteTodo = async function(id) {
  try {
    var deleted = await ToDo.remove({_id: id})
    if (deleted.result.n === 0) {
      throw Error('Todo could not be deleted')
    }
    return deleted
  } catch(e) {
    throw Error('Error occurred while deleting the todo.')
  }
}
