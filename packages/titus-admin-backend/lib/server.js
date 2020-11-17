'use strict'

const path = require('path')

const fp = require('fastify-plugin')

const validateConfig = require('./pluginConfig')

async function plugin(fastify, config) {
  const options = validateConfig(config)

  if (options.ui) {
    const root = path.resolve(
      __dirname,
      '../node_modules/titus-admin-frontend/build'
    )

    fastify.register(require('fastify-static'), {
      root: root
    })

    fastify.setNotFoundHandler((_, reply) => {
      reply.sendFile('index.html')
    })
  }

  await fastify.register(require('./plugins/graphql'), options)
  await fastify.register(require('./plugins/auth'), options)
}

module.exports = fp(plugin)
