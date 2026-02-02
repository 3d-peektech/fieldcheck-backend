// routes/users.js - User management routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// @route   GET /api/v1/users
// @desc    Get all users
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// @route   GET /api/v1/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
});

// @route   PUT /api/v1/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, updated_at = NOW() WHERE id = $4 RETURNING id, email, first_name, last_name',
      [firstName, lastName, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// @route   DELETE /api/v1/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router;
