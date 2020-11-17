import React, { useContext } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'

import { ThemeSwitcherContext } from './ThemeSwitcherProvider'

const useStyles = makeStyles(theme => ({
  appBar: {
    marginBottom: theme.spacing(3),
    flexDirection: 'row'
  }
}))

export default function Navigation({ makeRelative }) {
  const classes = useStyles()
  const toggleThemeType = useContext(ThemeSwitcherContext)

  const isGroups = useRouteMatch(makeRelative('groups'))

  const currentTab = isGroups ? 'groups' : 'users'

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Tabs value={currentTab}>
        <Tab
          component={NavLink}
          to={makeRelative('users')}
          label="Users"
          value="users"
        />
        <Tab
          component={NavLink}
          to={makeRelative('groups')}
          label="Groups"
          value="groups"
        />
      </Tabs>
      <Box ml="auto">
        <IconButton title="toggle theme type" onClick={toggleThemeType}>
          <Typography>
            <span role="img" aria-label="switch color mode">
              🔆
            </span>
          </Typography>
        </IconButton>
      </Box>
    </AppBar>
  )
}
