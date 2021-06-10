'use strict'

const config = {
  port: process.env.PORT || 3000, // Port Server (default is 3000)
  session: {
    maxAge: 60000,
    secret: 'secret for session'
  },
  sso_url_login: 'http://localhost:4000/login',
  sso_url_token: 'http://localhost:4000/token'
}

module.exports = config
