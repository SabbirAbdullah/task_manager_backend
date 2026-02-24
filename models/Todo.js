const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Todo = sequelize.define('Todo', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  description: { 
    type: DataTypes.TEXT 
  },

  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },

  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },

  dueDate: {
    type: DataTypes.DATE
  },

  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  timestamps: true
});

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = Todo;