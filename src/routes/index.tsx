import { Route, Routes } from "react-router-dom"

import Home from "../views/Home"
import QuizCyber from "../views/Quiz/Cyber"
import QuizDeveloper from "../views/Quiz/Developer"
import QuizIntra from "../views/Quiz/Intra"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Quiz routes */}
      <Route path="/quiz/developer" element={<QuizDeveloper />} />
      <Route path="/quiz/cyber" element={<QuizCyber />} />
      <Route path="/quiz/intra" element={<QuizIntra />} />
    </Routes>
  )
}

export default Router
