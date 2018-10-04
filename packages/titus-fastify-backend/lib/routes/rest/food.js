const foodClient = require('../../rest/food')

module.exports = function (server, opts, next) {
  server.get('/food', async (request, reply) => {
    const { offset, limit } = request.query

    return foodClient.getAll(server.pg, { offset, limit })
  })

  server.get('/food/:id', async (request, reply) => {
    const { id } = request.params

    return foodClient.getById(server.pg, { id })
  })

  server.get('/food/search/:type/:needle', async (request, reply) => {
    const { type, needle } = request.params

    return foodClient.search(server.pg, { type, needle })
  })

  server.get('/food/keyword/:keywordType/:needle', async (request, reply) => {
    const { keywordType, needle } = request.params

    return foodClient.keyword(server.pg, { keywordType, needle })
  })

  server.put('/food', async (request, reply) => {
    const { name, foodGroupId } = request.body

    const food = {
      name,
      foodGroupId
    }

    return foodClient.create(server.pg, { food })
  })

  server.post('/food', async (request, reply) => {
    const { id, name, foodGroupId } = request.body

    const food = {
      id,
      name,
      foodGroupId
    }

    return foodClient.update(server.pg, { food })
  })

  server.delete('/food/:ids', async (request, reply) => {
    const { ids } = request.params

    return foodClient.deleteFoods(server.pg, { ids })
  })

  next()
}
