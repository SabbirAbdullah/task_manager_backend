const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = Todo;
