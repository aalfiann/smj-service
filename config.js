'use strict'

const config = {
  port: process.env.PORT || 3000, // Port Server (default is 3000)
  session: {
    maxAge: 60000,
    secret: 'secret for session'
  }
}

module.exports = config
