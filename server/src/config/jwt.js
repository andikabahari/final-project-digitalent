module.exports = {
  // JWT secret
  secret: process.env.JWT_SECRET || 'mysecret',

  // Expires (in seconds)
  expires: process.env.JWT_EXPR || 3600,
}
