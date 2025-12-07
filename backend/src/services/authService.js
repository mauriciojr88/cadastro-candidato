const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const pool = require('../config/db');

dotenv.config();

async function createUser(name, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, passwordHash]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function authenticate(email, password) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return null;

    const accessToken = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    return {
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken
    };
  } finally {
    client.release();
  }
}

function refreshAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { sub: decoded.sub },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
    return newAccessToken;
  } catch (err) {
    return null;
  }
}

module.exports = {
  createUser,
  authenticate,
  refreshAccessToken
};
