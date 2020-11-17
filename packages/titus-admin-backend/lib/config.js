'use strict'

require('dotenv').config()

module.exports = {
  server: {
    host: process.env.API_HOST,
    port: process.env.API_PORT
  },
  fastify: {
    logger: { level: 'debug' }
  },
  cors: { origin: !!process.env.CORS_ORIGIN, credentials: true },
  auth: {
    ui: process.env.SERVE_UI,
    provider: process.env.AUTH_PROVIDER,
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      connection: process.env.AUTH0_CONNECTION
    },
    cognito: {
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID
    }
  }
}
