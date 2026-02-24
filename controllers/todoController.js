const Todo = require('../models/Todo');

// Get all todos
const { Op } = require('sequelize');

const getTodos = async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;

  const where = {
    UserId: req.user.id,
    isDeleted: false
  };

  if (status) where.status = status;
  if (priority) where.priority = priority;

  const todos = await Todo.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    order: [['createdAt', 'DESC']]
  });

  res.json({
    total: todos.count,
    page: Number(page),
    data: todos.rows
  });
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
  if (todo.UserId !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });

  await todo.update({ isDeleted: true });

  res.json({ message: 'Task deleted (soft)' });
};

//status
const getStats = async (req, res) => {
  const total = await Todo.count({
    where: { UserId: req.user.id, isDeleted: false }
  });

  const completed = await Todo.count({
    where: { UserId: req.user.id, status: 'completed', isDeleted: false }
  });

  const pending = await Todo.count({
    where: { UserId: req.user.id, status: 'pending', isDeleted: false }
  });

  const highPriority = await Todo.count({
    where: { UserId: req.user.id, priority: 'high', isDeleted: false }
  });

  res.json({
    total,
    completed,
    pending,
    highPriority
  });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo , getStats};
