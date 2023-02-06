import { Box, Button, LinearProgress, Typography, useTheme } from "@mui/material"
import { useCallback, useMemo, useState } from "react"

import { useAlert } from "../contexts/alert"
import { QuestionInterface } from "../types/quiz.interface"
import Helper from "./Helper"
import Question from "./Question"

type AnswerType = {
  question: QuestionInterface
  correct?: boolean | null
}
interface QuizProps {
  title: string
  questions: QuestionInterface[]
}
const Quiz = ({ title, questions: pQuestions }: QuizProps) => {
  const addAlert = useAlert()
  const theme = useTheme()

  const [index, setIndex] = useState(0)
  const [questions, setQuestions] = useState<AnswerType[]>(
    pQuestions.map((question) => ({ question, correct: null })),
  )

  const handleSubmit = useCallback(
    (correct: boolean) => {
      setQuestions((prev) => {
        const newQuestions = [...prev]
        newQuestions[index] = { ...newQuestions[index], correct }
        return newQuestions
      })
      setIndex((prev) => prev + 1)

      addAlert(
        correct ? "Bonne réponse" : "Mauvaise réponse",
        correct ? "success" : "error",
      )
    },
    [addAlert, index],
  )

  const question = useMemo(() => questions.at(index) ?? null, [index, questions])
  const validates = questions.filter((q) => q.correct !== null)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        rowGap: 2,
      }}
    >
      <Typography variant="h1" sx={{ margin: theme.spacing(6, 0, 4) }}>
        Quiz - {title}
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Question question={question?.question ?? null} onSubmit={handleSubmit} />
      </Box>
      <Box sx={{ mb: 6, width: 1000, maxWidth: "50vw" }}>
        <Helper title={`${validates.length} / ${questions.length}`}>
          <LinearProgress
            value={(validates.length / questions.length) * 100}
            variant="determinate"
            color="inherit"
            sx={{
              color: theme.palette.text.secondary,
              padding: theme.spacing(0.5, 0),
            }}
          />
        </Helper>
      </Box>
    </Box>
  )
}

export default Quiz
