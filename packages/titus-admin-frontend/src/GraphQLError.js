export default class GraphQLError extends Error {
  constructor(err) {
    const message = [
      ...((err.httpError && JSON.parse(err.httpError?.body || {})?.errors) ||
        []),
      ...(err.graphQLErrors || [])
    ].find(Boolean)?.message

    super(message)
  }
}
