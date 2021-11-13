/// <reference types="cypress" />
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

/**
 * @type {Cypress.PluginConfig}
 */
const dotenv = require('dotenv')

dotenv.config()
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {

console.log('config=',config)

        // ...
        config.env.auth_username_nonapprover = process.env.AUTH_USERNAME_NONAPPROVER
        config.env.auth_password_nonapprover = process.env.AUTH_PASSWORD_NONAPPROVER
        config.env.auth_username_approver = process.env.AUTH_USERNAME_APPROVER
        config.env.auth_password_approver = process.env.AUTH_PASSWORD_APPROVER
        config.env.okta_domain = process.env.REACT_APP_OKTA_DOMAIN
        config.env.okta_client_id = process.env.REACT_APP_CLIENT_ID

        // plugins code ...
    console.log('okta_client_id=',config.env.okta_client_id)
    console.log('okta_domain=',config.env.okta_domain)

        return config

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
