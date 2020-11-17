import React, { lazy, Suspense } from 'react'
import T from 'prop-types'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { CircularProgress, makeStyles } from '@material-ui/core'

const Admin = lazy(() => import('./components/Admin'))

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0
    }
  }
})

export default function App({ token, serverUrl, ...props }) {
  useStyles()

  const client = new GraphQLClient({
    url: serverUrl
  })

  if (token) {
    client.setHeader('Authorization', `Bearer ${token}`)
  }

  return (
    <ClientContext.Provider value={client}>
      <Suspense fallback={<CircularProgress />}>
        <Admin {...props} />
      </Suspense>
    </ClientContext.Provider>
  )
}

App.propTypes = {
  serverUrl: T.string.isRequired,
  token: T.string
}
