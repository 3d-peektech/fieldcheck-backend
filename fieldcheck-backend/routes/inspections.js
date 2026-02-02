// routes/inspections.js - Inspection management routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// @route   GET /api/v1/inspections
// @desc    Get all inspections
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM inspections ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      message: 'Inspections retrieved successfully',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get inspections error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving inspections',
      error: error.message
    });
  }
});

// @route   GET /api/v1/inspections/:id
// @desc    Get inspection by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM inspections WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    res.json({
      success: true,
      message: 'Inspection retrieved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get inspection error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving inspection',
      error: error.message
    });
  }
});

// @route   POST /api/v1/inspections
// @desc    Create new inspection
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { 
      assetId, 
      inspectorId, 
      status,
      notes,
      scheduledDate,
      completedDate 
    } = req.body;

    const result = await pool.query(
      'INSERT INTO inspections (asset_id, inspector_id, status, notes, scheduled_date, completed_date, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [assetId, inspectorId, status || 'pending', notes, scheduledDate, completedDate]
    );

    res.status(201).json({
      success: true,
      message: 'Inspection created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create inspection error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating inspection',
      error: error.message
    });
  }
});

// @route   PUT /api/v1/inspections/:id
// @desc    Update inspection
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      assetId, 
      inspectorId, 
      status,
      notes,
      scheduledDate,
      completedDate 
    } = req.body;

    const result = await pool.query(
      'UPDATE inspections SET asset_id = $1, inspector_id = $2, status = $3, notes = $4, scheduled_date = $5, completed_date = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [assetId, inspectorId, status, notes, scheduledDate, completedDate, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    res.json({
      success: true,
      message: 'Inspection updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update inspection error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating inspection',
      error: error.message
    });
  }
});

// @route   DELETE /api/v1/inspections/:id
// @desc    Delete inspection
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM inspections WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    res.json({
      success: true,
      message: 'Inspection deleted successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('Delete inspection error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting inspection',
      error: error.message
    });
  }
});

module.exports = router;
