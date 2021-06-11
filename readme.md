# SMJ-SERVICE
[![Build Status](https://travis-ci.com/aalfiann/smj-service.svg?branch=master)](https://travis-ci.com/aalfiann/smj-service)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/smj-service/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/smj-service?branch=master)


## Detail Installation

### Requirement
1. Minimum NodeJS 12
2. MySQL

### 1. Setup Application
1. Download and extract this source code in your computer
2. Go to extracted directory and run `npm install` to install all package libraries.
3. Edit the `config.js`

### 2. Configuration
1. See the `config.js`  
```js
'use strict'

const config = {
  port: process.env.PORT || 3000, // Port Server (default is 3000)
  session: {
    maxAge: 60000,
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
```
Note:  
- Default will use standard host and port of MySQL.
- You have to create new database name with `service_db` (you are able to change this)
- Application use default port `3000`

### 3. Setup Database
1. Create table by run `npm run seed`

### 4. Run Application
Before running the application make sure you already run `npm run seed` for the first time only.
1. To start the application, just run `npm start` then open your browser to `http://localhost:3000`.

### 5. Integration with SSO Server
- **Callback Url**  
  http://localhost:3000/cb

- **Register**  
  Go to **SSO Server** at [http://localhost:4000/register](http://localhost:4000/register), fill the form and submit, when you have the client_id and client_secret, you have to edit the `config.js` then restart this server by run `npm start`.


### Unit Test
```
npm test
```