const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db'); // connectDB removed, handled here
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Root route (public)
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Todo Backend API is running 🚀',
    version: '1.0.0'
  });
});

// Server start function
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully.');

    // Sync tables
    await sequelize.sync();
    console.log('✅ Database tables synced successfully.');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at 👉 http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start everything
startServer();
