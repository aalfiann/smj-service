'use strict'

const { db } = require('./lib/connection')
const { User } = require('./models/user')
const seed = async () => {
  await User.sync({ force: true })
  db.close()
}

seed()
