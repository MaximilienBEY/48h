import {
  Box,
  Button,
  darken,
  lighten,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import deepEqual from "deep-equal"
import { useCallback, useEffect, useMemo, useState } from "react"

import { useAlert } from "../contexts/alert"
import { QuestionInterface } from "../types/quiz.interface"
import { getParams, shuffleArray } from "../utils/basic"
import Editor from "./Editor"

interface QuestionProps {
  question: QuestionInterface | null
  onSubmit: (correct: boolean) => void
}
const Question = ({ question: pQuestion, onSubmit }: QuestionProps) => {
  const theme = useTheme()
  const addAlert = useAlert()

  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState<QuestionInterface | null>(null)

  const [tries, setTries] = useState(0)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])

  const type = useMemo(
    () =>
      !question
        ? null
        : question.answer
        ? "input"
        : question.tests
        ? "code"
        : question.choices
        ? question.choices.filter((f) => f.isCorrect).length >= 2
          ? "multiple"
          : "single"
        : null,
    [question],
  )
  const disabled = useMemo(() => {
    if (!question) return true
    if (type === "single" || type === "multiple") return !answers.length
    if (type === "input" || type === "code") return !answer.length

    return true
  }, [answer.length, answers.length, question, type])
  const choices = useMemo(
    () => (question?.choices ? shuffleArray(question.choices) : null),
    [question?.choices],
  )

  const resetValues = useCallback((question: QuestionInterface) => {
    setQuestion(question)
    setAnswers([])

    if (question.tests) {
      const defaultParams = question.tests.at(0)?.params ?? []
      const params = getParams(defaultParams)
      setAnswer(
        `
const main = (${params.join(", ")}) => {
  // Write your code here and return the result
}
`.trim(),
      )
    } else setAnswer("")
  }, [])
  const multipleSelect = useCallback(
    (id: string) => {
      setAnswers((prev) =>
        type === "single"
          ? [id]
          : prev.includes(id)
          ? prev.filter((answer) => answer !== id)
          : [...prev, id],
      )
    },
    [type],
  )
  const handleSubmit = useCallback(() => {
    if (disabled || !question) return

    if (type === "single") {
      onSubmit(answers[0] === question.choices?.find((f) => f.isCorrect)?.id)
    } else if (type === "multiple") {
      const correct = question.choices?.filter((f) => f.isCorrect).map((m) => m.id)
      onSubmit(
        answers.length === correct?.length && answers.every((a) => correct?.includes(a)),
      )
    } else if (type === "input") {
      onSubmit(answer.trim().toLowerCase() === question.answer!.trim().toLowerCase())
    } else if (type === "code") {
      const content = answer.split("\n").slice(1, -1).join("\n").trim()
      if (question.forbiddenTerms?.find((f) => content.match(f)))
        return addAlert("Vous avez utilisé un terme interdit dans votre code.")

      const defaultParams = question.tests!.at(0)?.params ?? []
      const params = getParams(defaultParams)

      try {
        const func = new Function(...params, content)
        const results = question.tests!.map(({ params, expected }) => {
          const result = func(...params)
          return {
            result,
            expected,
          }
        })
        console.log("Results", results)

        const wrongAnswer = results.find((r) => !deepEqual(r.result, r.expected))
        if (tries >= 4 || !wrongAnswer) {
          onSubmit(!wrongAnswer)
          setTries(0)
        } else {
          setTries((prev) => prev + 1)
          addAlert("Un test a échoué, regardez la console pour voir le détail.")
        }
      } catch (error) {
        if (tries >= 4) {
          onSubmit(false)
          setTries(0)
        } else {
          setTries((prev) => prev + 1)
          addAlert("Un test a échoué, regardez la console pour voir le détail.")
          console.log(error)
        }
      }
    }
  }, [addAlert, answer, answers, disabled, onSubmit, question, tries, type])

  useEffect(() => {
    if (question?.title === pQuestion?.title) return
    if (question) {
      setOpen(false)
      setTimeout(() => {
        if (pQuestion) {
          setQuestion(pQuestion)
          resetValues(pQuestion)
          setOpen(true)
        } else setQuestion(null)
      }, 300)
    } else {
      setQuestion(pQuestion)
      if (pQuestion) resetValues(pQuestion)
      setTimeout(() => setOpen(true), 0)
    }
  }, [pQuestion, question, resetValues])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        opacity: open ? 1 : 0,
        transition: theme.transitions.create("opacity"),
        rowGap: 4,
      }}
    >
      {question && type ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              rowGap: 1.5,
              lineHeight: 1,
              width: 1000,
              maxWidth: "50vw",
            }}
          >
            <Typography variant="h3">{question.title}</Typography>
            <Typography variant="large" color="text.secondary">
              {question.description}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
              alignItems: "stretch",
              rowGap: 2,
              "& > div:first-of-type": { flex: 1 },
            }}
          >
            {type === "single" || type === "multiple" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  rowGap: 1,
                }}
              >
                {choices!.map((choice) => (
                  <Button
                    key={choice.id}
                    onClick={() => multipleSelect(choice.id)}
                    size="large"
                    variant="contained"
                    color="inherit"
                    sx={{
                      padding: theme.spacing(2, 4),
                      background: answers.includes(choice.id)
                        ? lighten(theme.palette.paper.default, 0.15)
                        : theme.palette.paper.default,
                      "&:hover": {
                        background: answers.includes(choice.id)
                          ? lighten(theme.palette.paper.default, 0.1)
                          : darken(theme.palette.paper.default, 0.15),
                      },
                      "& .MuiTouchRipple-root": { opacity: 0.25 },
                    }}
                  >
                    {choice.label}
                  </Button>
                ))}
              </Box>
            ) : type === "input" ? (
              <Box>
                <TextField
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Écrivez votre réponse ici"
                  sx={{ width: "100%" }}
                />
              </Box>
            ) : type === "code" ? (
              <Editor value={answer} onChange={setAnswer} />
            ) : (
              <></>
            )}
            <Button
              sx={{ alignSelf: "center" }}
              variant="contained"
              disabled={disabled}
              onClick={handleSubmit}
            >
              Valider{type === "code" ? ` ${5 - tries}/5` : ""}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  )
}

export default Question
