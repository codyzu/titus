const SQL = require('@nearform/sql')

const dbErrors = require('../../../lib/db-client/errors')
const getById = require('../../../lib/db-client/food-group/get-by-id')

jest.mock('@nearform/sql')

beforeEach(() => {
  SQL.mockReset()
  SQL.mockReturnValueOnce('input-query')
})

test('returns row with camelised column names', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rows: [{ some_column: 'some_value' }] })
  }

  const data = await getById(pgStub, { id: 123 })

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith('input-query')

  expect(data).toEqual({ someColumn: 'some_value' })
})

test('throws error when the entry does not exist in db', async () => {
  const pgStub = {
    query: jest.fn().mockResolvedValue({ rowCount: 0 })
  }

  await expect(
    getById(pgStub, { id: 123 })
  ).rejects.toThrow(expect.any(dbErrors.NotFoundError))

  expect(SQL).toHaveBeenCalledTimes(1)

  expect(pgStub.query).toHaveBeenCalledTimes(1)
  expect(pgStub.query).toBeCalledWith('input-query')
})