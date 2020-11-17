import React, { useCallback } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Box, CircularProgress } from '@material-ui/core'
import { useQuery } from 'graphql-hooks'

import { LOAD_SCHEMA } from '../graphql'

import Users from './Users'
import Groups from './Groups'
import User from './User'
import Group from './Group'
import Navigation from './Navigation'
import SchemaContext from './SchemaContext'

export default function Admin({ match }) {
  const { pathname } = useLocation()
  const { data, loading } = useQuery(LOAD_SCHEMA)

  const makeRelative = useCallback(
    path => [match.path.replace(/\/$/, ''), path].join('/'),
    [match]
  )

  return (
    <Box width="100%">
      <Navigation makeRelative={makeRelative} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box mx={2}>
          <SchemaContext.Provider value={data.__schema}>
            <Switch>
              <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
              <Redirect from={match.path} exact to={makeRelative('users')} />
              <Route path={makeRelative('users')} exact>
                <Users />
              </Route>
              <Route path={makeRelative('users/:userId')}>
                {({ match }) => <User userId={match.params.userId} />}
              </Route>
              <Route path={makeRelative('groups')} exact>
                <Groups />
              </Route>
              <Route path={makeRelative('groups/:groupId')}>
                {({ match }) => <Group groupId={match.params.groupId} />}
              </Route>
            </Switch>
          </SchemaContext.Provider>
        </Box>
      )}
    </Box>
  )
}
