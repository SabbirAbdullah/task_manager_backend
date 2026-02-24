const User = require('../models/User');

const getProfile = async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    age: req.user.age,
    gender: req.user.gender
  });
};

const updateProfile = async (req, res) => {
  const { name, address, age, gender } = req.body;

  await req.user.update({ name, address, age, gender });

  res.json({ message: 'Profile updated successfully' });
};

module.exports = { getProfile, updateProfile };