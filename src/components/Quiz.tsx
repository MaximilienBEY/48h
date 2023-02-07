import { ArrowBackIos, CheckCircleOutline, ErrorOutline } from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAlert } from "../contexts/alert"
import { QuestionInterface } from "../types/quiz.interface"
import Editor from "./Editor"
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
  const navigate = useNavigate()

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
        width: 1000,
        maxWidth: "50vw",
        margin: "0 auto",
        [theme.breakpoints.down("xl")]: { maxWidth: "60vw" },
        [theme.breakpoints.down("lg")]: { maxWidth: "70vw" },
        [theme.breakpoints.down("md")]: { maxWidth: "80vw" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "center",
          margin: theme.spacing(6, 0, 4),
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.secondary,
            padding: 1,
            cursor: "pointer",
          }}
        >
          <ArrowBackIos sx={{ height: 20 }} />
          <Typography variant="large" color="text.secondary">
            Retour aux quiz
          </Typography>
        </Box>
        <Typography variant="h1">Quiz - {title}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {question ? (
          <Question question={question?.question ?? null} onSubmit={handleSubmit} />
        ) : (
          <>
            <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
              Résultat du quiz {questions.filter((q) => q.correct).length} /{" "}
              {questions.length}
            </Typography>
            {questions.map(({ question, correct }, i) => (
              <Accordion key={i} sx={{ background: theme.palette.paper.darken }}>
                <AccordionSummary
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      display: "flex",
                      justifyContent: "space-between",
                      color: correct
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    },
                  }}
                >
                  <Typography variant="medium">{question.title}</Typography>
                  {correct ? <CheckCircleOutline /> : <ErrorOutline />}
                </AccordionSummary>
                <AccordionDetails>
                  {question.choices ? (
                    <>
                      <Box component="ul" sx={{ ml: 2 }}>
                        {question.choices.map((choice, i) => (
                          <Typography
                            key={i}
                            variant="body"
                            component="li"
                            color={choice.isCorrect ? "text.primary" : "text.secondary"}
                            sx={{
                              textDecoration: choice.isCorrect
                                ? undefined
                                : "line-through",
                            }}
                          >
                            {i + 1} - {choice.label}
                          </Typography>
                        ))}
                      </Box>
                    </>
                  ) : question.answer ? (
                    <Typography
                      variant="body"
                      sx={{
                        color: "text.secondary",
                        "& span": { color: "text.primary" },
                      }}
                    >
                      Bonné réponse: <span>{question.answer}</span>
                    </Typography>
                  ) : question.tests ? (
                    <>
                      <Typography variant="body" color="text.secondary">
                        Correction
                      </Typography>
                      <Editor value={question.response} onChange={() => null} readOnly />
                    </>
                  ) : (
                    <></>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>
      {question && (
        <Box sx={{ mb: 6, width: "100%" }}>
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
      )}
    </Box>
  )
}

export default Quiz
