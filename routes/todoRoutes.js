const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo, getStats } = require('../controllers/todoController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();



router.use(protect);
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/stats', getStats);

module.exports = router;
