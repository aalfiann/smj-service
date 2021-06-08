'use strict'

const express = require('express')
const router = express.Router()

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
    res.redirect('/')
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
