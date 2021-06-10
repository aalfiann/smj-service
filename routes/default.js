'use strict'

const express = require('express')
const router = express.Router()
const axios = require('axios')
const helper = require('../lib/helper')
const config = require('../config')

router.get('/', (req, res) => {
  res.render('index', {})
})

router.get('/home', (req, res) => {
  const token = ''
  if (req.session.token) {
    res.render('home', { token: token })
  } else {
    res.redirect('/')
  }
})

router.get('/login', (req, res) => {
  if (req.session.token) {
    res.redirect('/home')
  } else {
    res.redirect(config.sso_url_login)
  }
})

router.get('/cb', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.query.code)) {
      // get access token + expiry date from SSO
      const result = await axios.post(config.sso_url_token, {
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: '',
        client_secret: ''
      })
      if (result) {
        // service persist user in DB
        // service create a session token
        //
        // const hour = 3600000
        // req.session.token.expires = new Date(Date.now() + hour)
        // req.session.token.maxAge = hour
      }
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    } else {
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/profile', (req, res) => {
  if (req.session.token) {
    // get email information
  } else {
    res.redirect('/')
  }
})

module.exports = router
