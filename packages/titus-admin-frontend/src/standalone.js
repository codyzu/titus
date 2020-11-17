import React from 'react'
import { Route, Router as BrowserRouter } from 'react-router-dom'

import history from './history'
import Embedded from './embedded'
import config from './config'
import ThemeSwitcherProvider from './components/ThemeSwitcherProvider'

export default function Standalone() {
  return (
    <ThemeSwitcherProvider>
      <BrowserRouter history={history}>
        <Route path="/">
          {props => <Embedded serverUrl={config.serverUrl} {...props} />}
        </Route>
      </BrowserRouter>
    </ThemeSwitcherProvider>
  )
}
