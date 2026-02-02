// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Generar JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Validar campos requeridos
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email, password, firstName, and lastName'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'user'
    });

    // Generar token
    const token = generateToken(user.id);

    // No enviar password en la respuesta
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Error registering user',
      details: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verificar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generar token
    const token = generateToken(user.id);

    // No enviar password en la respuesta
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Error logging in',
      details: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Error getting user information',
      details: error.message
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // En un sistema con JWT, el logout se maneja en el cliente
    // borrando el token. Aquí solo confirmamos la operación.
    
    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Error logging out',
      details: error.message
    });
  }
};