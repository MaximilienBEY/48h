import Quiz from "../../components/Quiz"

const QuizIntra = () => {
  return (
    <Quiz
      title="Infra"
      questions={[
        // {
        //   title: "Les méthodes",
        //   description: "Quelle méthode est utilisée pour récupérer des données en CRUD",
        //   choices: [
        //     { id: "get", label: "GET", isCorrect: true },
        //     { id: "put", label: "PUT" },
        //     { id: "post", label: "POST" },
        //     { id: "delete", label: "DELETE" },
        //   ],
        // },
        // {
        //   title: "Les méthodes 2",
        //   description: "Quelle méthode est utilisée pour récupérer des données en CRUD 2",
        //   choices: [
        //     { id: "get", label: "GET", isCorrect: true },
        //     { id: "put", label: "PUT", isCorrect: true },
        //     { id: "post", label: "POST" },
        //     { id: "delete", label: "DELETE" },
        //   ],
        // },
        {
          title: "Map",
          description:
            "Récréer la fonction map en n'utilisant que des fonctions natives.",
          tests: [
            {
              params: [["1", "2", "3"], (element: string) => `test-${element}`],
              expected: ["test-1", "test-2", "test-3"],
            },
          ],
          forbiddenFunctions: [],
        },
      ]}
    />
  )
}

export default QuizIntra
