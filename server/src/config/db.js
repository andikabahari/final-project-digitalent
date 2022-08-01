module.exports = {
  // Connection URL
  url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mern-jwt-auth',

  // Options
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
}
