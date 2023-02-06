import {
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from "@mui/material"
import { createContext, useCallback, useContext, useMemo, useState } from "react"

import { getTheme } from "../styles/theme"
import { parseLocal } from "../utils/basic"

export type ThemeType = "light" | "dark" | "system"
const ThemeContext = createContext<{
  type: ThemeType
  changeType: (theme: ThemeType) => void
}>({
  type: "system",
  changeType: () => null,
})

export const useThemeType = () => useContext(ThemeContext)
export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [type, setType] = useState(parseLocal("theme") ?? "system")

  const themeType = useMemo(
    () => (type === "system" ? "dark" ?? (prefersDarkMode ? "dark" : "light") : type),
    [prefersDarkMode, type],
  )
  const changeType = useCallback((type: ThemeType) => {
    setType(type)
  }, [])
  const theme = useMemo(() => getTheme(themeType), [themeType])

  const value = useMemo(
    () => ({
      type,
      changeType,
    }),
    [type, changeType],
  )
  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
