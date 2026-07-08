import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email?.toLowerCase().trim();

    if (!name || !normalizedEmail || !password) {
      res.status(400);
      throw new Error('Please provide name, email and password');
    }

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate a user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const demoEmail = process.env.DEMO_EMAIL || 'demo@devmentor.ai';
    const demoPassword = process.env.DEMO_PASSWORD || 'demo12345';

    if (normalizedEmail === demoEmail.toLowerCase() && password === demoPassword) {
      let user = await User.findOne({ email: demoEmail }).select('+password');

      if (!user) {
        user = await User.create({
          name: 'Demo User',
          email: demoEmail,
          password: demoPassword,
        });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        token: generateToken(user._id, user.email, user.role),
      });
    }

    // Check for user email and explicitly select password to compare
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    console.log('[Auth] Login attempt:', { email: normalizedEmail, userFound: !!user });
    
    if (user) {
      const isPasswordMatch = await user.matchPassword(password);
      console.log('[Auth] Password match:', isPasswordMatch);
      
      if (isPasswordMatch) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          token: generateToken(user._id, user.email, user.role),
        });
      }
    }
    
    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
