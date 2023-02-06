import React from "react"
import ReactDOM from "react-dom/client"

import Providers from "./contexts"
import Router from "./routes"
import Global from "./styles/Global"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global />
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
)
