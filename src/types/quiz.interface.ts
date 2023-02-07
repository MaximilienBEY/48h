export type ChoiceInterface = {
  id: string
  label: string
  isCorrect?: boolean
}
export type QuestionInterface = {
  title: string
  description: string
} & (
  | {
      answer: string
      choices?: undefined
      tests?: undefined
      forbiddenTerms?: undefined
      response?: undefined
    }
  | {
      answer?: undefined
      choices: ChoiceInterface[]
      tests?: undefined
      forbiddenTerms?: undefined
      response?: undefined
    }
  | {
      answer?: undefined
      choices?: undefined
      tests: {
        params: any[]
        expected: any
      }[]
      forbiddenTerms: RegExp[]
      response: string
    }
)
