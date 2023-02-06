import { BrowserRouter } from "react-router-dom"

import { AlertProvider } from "./alert"
import { ThemeProvider } from "./theme"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AlertProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default Providers
