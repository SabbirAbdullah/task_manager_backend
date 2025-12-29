const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Register
const register = async (req, res) => {
  const { name, email, password, address, age, gender } = req.body;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, address, age, gender });
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  });
};

// Forget Password
const forgetPassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated successfully' });
};

module.exports = { register, login, forgetPassword };
