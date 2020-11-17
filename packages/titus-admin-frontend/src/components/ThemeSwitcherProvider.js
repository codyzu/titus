import React, { useCallback, useMemo, useState } from 'react'
import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery
} from '@material-ui/core'

import themeObject from '../theme'

export const ThemeSwitcherContext = React.createContext()

export default function ThemeSwitcherProvider({ children }) {
  const fromMediaQuery = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light'
  const fromUserPreferences = localStorage.getItem('themeType')

  const [themeType, setThemeType] = useState(
    fromUserPreferences || fromMediaQuery
  )

  const toggleThemeType = useCallback(
    () =>
      setThemeType(t => {
        const type = t === 'dark' ? 'light' : 'dark'

        localStorage.setItem('themeType', type)

        return type
      }),
    []
  )

  const theme = useMemo(
    () =>
      createMuiTheme({
        ...themeObject,
        palette: {
          type: themeType,
          ...themeObject.palette
        }
      }),
    [themeType]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeSwitcherContext.Provider value={toggleThemeType}>
        {children}
      </ThemeSwitcherContext.Provider>
    </ThemeProvider>
  )
}
