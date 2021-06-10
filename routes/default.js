'use strict'

const express = require('express')
const router = express.Router()
const axios = require('axios')
const helper = require('../lib/helper')
const config = require('../config')
const { User } = require('../models/user')

router.get('/', (req, res) => {
  if (req.session.token) {
    res.redirect('/home')
  } else {
    res.render('index', {})
  }
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
    res.redirect(config.sso_url_login + '?client_id=' + config.sso_client_id)
  }
})

router.get('/logout', (req, res) => {
  if (req.session.token) {
    req.session.destroy(function (error) {
      if (error) console.log(error)
      res.redirect('/')
    })
  } else {
    res.redirect('/')
  }
})

router.get('/cb', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.query.code)) {
      // get access token + expiry date from SSO
      const result = await axios.post(config.sso_url_token, {
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: config.sso_client_id,
        client_secret: config.sso_client_secret
      })
      if (result) {
        // get user profile from SSO
        const getUser = await axios.post(config.sso_url_profile, {}, {
          headers: { Authorization: `Bearer ${result.data.response.access_token}` }
        })
        if (getUser) {
          // service persist user in DB
          // save/update to db
          const checkUser = await User.findOne({ where: { id: getUser.data.response.user_id } })
          if (checkUser === null) {
            // save
            await User.create({ id: getUser.data.response.user_id, email: getUser.data.response.email, status: getUser.data.response.status })
          } else {
            // update
            await User.update({ email: getUser.data.response.email, status: getUser.data.response.status }, { where: { id: getUser.data.response.user_id } })
          }
        }
        // service create a session access token
        const timeout = (result.data.response.expires_in * 1000)
        req.session.cookie.maxAge = timeout
        req.session.token = result.data.response.access_token
        req.session.user_id = getUser.data.response.user_id
        req.session.save(function (error) {
          if (error) {
            return res.status(400).json({
              status: false,
              message: 'Bad Request'
            })
          }
        })
        // redirect to protected page
        return res.redirect('/home')
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

router.get('/profile', async (req, res) => {
  if (req.session.token) {
    // get user information
    const getUser = await User.findOne({ where: { id: req.session.user_id } })
    if (getUser) {
      res.json({
        status: true,
        message: 'Succesful get user information',
        response: getUser
      })
    } else {
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    }
  } else {
    res.redirect('/')
  }
})

module.exports = router
