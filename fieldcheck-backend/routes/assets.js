// routes/assets.js - Asset management routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// @route   GET /api/v1/assets
// @desc    Get all assets
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM assets ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      message: 'Assets retrieved successfully',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get assets error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving assets',
      error: error.message
    });
  }
});

// @route   GET /api/v1/assets/:id
// @desc    Get asset by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset retrieved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving asset',
      error: error.message
    });
  }
});

// @route   POST /api/v1/assets
// @desc    Create new asset
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      type, 
      location, 
      companyId, 
      serialNumber,
      status,
      description 
    } = req.body;

    const result = await pool.query(
      'INSERT INTO assets (name, type, location, company_id, serial_number, status, description, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [name, type, location, companyId, serialNumber, status || 'active', description]
    );

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating asset',
      error: error.message
    });
  }
});

// @route   PUT /api/v1/assets/:id
// @desc    Update asset
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      type, 
      location, 
      companyId, 
      serialNumber,
      status,
      description 
    } = req.body;

    const result = await pool.query(
      'UPDATE assets SET name = $1, type = $2, location = $3, company_id = $4, serial_number = $5, status = $6, description = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [name, type, location, companyId, serialNumber, status, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating asset',
      error: error.message
    });
  }
});

// @route   DELETE /api/v1/assets/:id
// @desc    Delete asset
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM assets WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: 'Asset deleted successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting asset',
      error: error.message
    });
  }
});

module.exports = router;
