import { Route, Routes } from "react-router-dom"

import Home from "../views/Home"
import QuizCyber from "../views/Quiz/Cyber"
import QuizDeveloper from "../views/Quiz/Developer"
import QuizInfra from "../views/Quiz/Infra"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Quiz routes */}
      <Route path="/quiz/developer" element={<QuizDeveloper />} />
      <Route path="/quiz/cyber" element={<QuizCyber />} />
      <Route path="/quiz/infra" element={<QuizInfra />} />
    </Routes>
  )
}

export default Router
