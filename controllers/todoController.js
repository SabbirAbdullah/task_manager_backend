const Todo = require('../models/Todo');

// Get all todos
const getTodos = async (req, res) => {
  const todos = await Todo.findAll({ where: { UserId: req.user.id } });
  res.json(todos);
};

// Create todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, UserId: req.user.id });
  res.status(201).json(todo);
};

// Update todo
const updateTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  if (todo.UserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  await todo.update(req.body);
  res.json(todo);
};

// Delete todo
const deleteTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  if (todo.UserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  await todo.destroy();
  res.json({ message: 'Todo deleted' });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
