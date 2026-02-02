// routes/companies.js - Company management routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// @route   GET /api/v1/companies
// @desc    Get all companies
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM companies ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      message: 'Companies retrieved successfully',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving companies',
      error: error.message
    });
  }
});

// @route   GET /api/v1/companies/:id
// @desc    Get company by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM companies WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Company retrieved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving company',
      error: error.message
    });
  }
});

// @route   POST /api/v1/companies
// @desc    Create new company
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, address, industry, contactEmail, contactPhone } = req.body;

    const result = await pool.query(
      'INSERT INTO companies (name, address, industry, contact_email, contact_phone, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [name, address, industry, contactEmail, contactPhone]
    );

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating company',
      error: error.message
    });
  }
});

// @route   PUT /api/v1/companies/:id
// @desc    Update company
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, industry, contactEmail, contactPhone } = req.body;

    const result = await pool.query(
      'UPDATE companies SET name = $1, address = $2, industry = $3, contact_email = $4, contact_phone = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [name, address, industry, contactEmail, contactPhone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Company updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating company',
      error: error.message
    });
  }
});

// @route   DELETE /api/v1/companies/:id
// @desc    Delete company
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM companies WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Company deleted successfully',
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting company',
      error: error.message
    });
  }
});

module.exports = router;
