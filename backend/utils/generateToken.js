import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

/**
 * Generate a JWT for a given user ID
 * @param {string} id - The user's MongoDB ObjectId
 * @param {string} email - The user's email
 * @param {string} role - The user's role
 * @returns {string} - The signed JWT string
 */
const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn, // e.g., '30d'
    }
  );
};

export default generateToken;
