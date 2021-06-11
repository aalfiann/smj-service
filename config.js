'use strict'

const config = {
  port: process.env.PORT || 3000, // Port Server (default is 3000)
  session: {
    maxAge: 60000, // 1minute, will automatically update following expires time from SSO access_token
    secret: 'secret for session'
  },
  database: {
    name: 'service_db',
    user: 'root',
    pass: '',
    host: 'localhost',
    port: 3306,
    logging: true
  },
  sso_url_login: 'http://localhost:4000/login',
  sso_url_token: 'http://localhost:4000/token',
  sso_url_profile: 'http://localhost:4000/profile',
  sso_client_id: '60mwt1txtlnvadtjy5pkwtfwos78im67',
  sso_client_secret: 'kxiykbx9b4ibjd1ofhbg6qg3u4hshui22e8zrp0bqdw'
}

module.exports = config
