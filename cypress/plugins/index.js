// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const cucumber = require('cypress-cucumber-preprocessor').default
require('dotenv').config()

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  config.env = config.env || {}
  config.env.PASSWORD_ADMIN = process.env.PASSWORD_ADMIN
  config.env.USERNAME_ADMIN = process.env.USERNAME_ADMIN
  config.env.PASSWORD_INVALID = process.env.PASSWORD_INVALID
  config.env.USERNAME_INVALID = process.env.USERNAME_INVALID
  config.env.WEBSITE_URL = process.env.WEBSITE_URL
  config.env.NAME_ADMIN = process.env.NAME_ADMIN
  config.env.LOGIN_URL = process.env.LOGIN_URL
  config.env.FORGOT_PASSWORD_URL = process.env.FORGOT_PASSWORD_URL
  return config
}
