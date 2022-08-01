const path = require('path')

// base path
global.__basepath = process.cwd()

if (!require('fs').existsSync(path.join(__basepath, 'server.js')))
  global.__basepath = path.join(__basepath, 'src')

// config
global._config = {
  app: require('./config/app.js'),
  db: require('./config/db.js'),
  jwt: require('./config/jwt.js'),
}

// helpers
global._url = require('./helpers/_url.js')
global._response = require('./helpers/_response.js')

// app
const app = require('./app.js')

app.listen(_config.app.port, () =>
  console.log(`Server running on port ${_config.app.port}`)
)
