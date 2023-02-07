import Quiz from "../../components/Quiz"

const QuizDeveloper = () => {
  return (
    <Quiz
      title="Développeur"
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
          title: "JavaScript",
          description: "Quel est l'opérateur qui permet de savoir le type de la variable en js ?",
          choices: [
            { id: "typeof", label: "typeof", isCorrect: true },
            { id: "instanceof", label: "instanceof" },
            { id: "oftype", label: "oftype" },
            { id: "d", label: "la réponse d" },
          ],
        },
        {
          title: "'Super Globla'",
          description: "Quel sont les variable 'Super Global' en php ?",
          choices: [
            { id: "get", label: "$_GET", isCorrect: true },
            { id: "admin", label: "$_ADMIN" },
            { id: "session", label: "$_SESSION", isCorrect: true },
            { id: "files", label: "$_FILES", isCorrect: true },
          ],
        },
        {
          title: "Trim()",
          description: "Re faire le prototype \"trim()\" sans utilisé \"trim()\", \"trimEnd()\" et \"trimStart()'",
          tests: [
            {
              params: [["1", "2", "3"], (element: string) => `test-${element}`],
              expected: ["test-1", "test-2", "test-3"],
            },
          ],
          forbiddenFunctions: [],
        },
        {
          title: "Rendre du code en html préformaté",
          description: "Comment rendre un code comme sur l'image (lien de l'image: https://fr.w3docs.com/uploads/media/default/0001/02/8f6451c9f351a5ec7a645c5503d1dd9d08b8bb7e.png)",
          choices: [
            { id: "code", label: "<code></code>" },
            { id: "style", label: "<style></style>" },
            { id: "pre", label: "<pre></pre>", isCorrect: true },
            { id: "dd", label: "<dd></dd>" },
          ],
        },
        {
          title: "\":\" en vuejs",
          description: "Que représente \":\" dans ce script \":href=\"url\"\" en vuejs ? (Voir minimum sur vuejs 2)",
          choices: [
            { id: "for", label: "v-for" },
            { id: "bind", label: "v-bind", isCorrect: true },
            { id: "if", label: "v-if" },
            { id: "on", label: "v-on", isCorrect: true },
          ],
        },
        {
          title: "Methode Http",
          description: "Quel sont les méthode http ?",
          choices: [
            { id: "crud", label: "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH", isCorrect: true },
            { id: "error", label: "dd, dodo, toto, coco" },
          ],
        },
        {
          title: "Quel est la méthode utilisée pour cette phrase ?",
          description: "La méthode ________ exige une représentation de la ressource désignée. \nLes requêtes _______ doivent seulement servir à récupérer des données.",
          choices: [
            { id: "get", label: "GET", isCorrect: true },
            { id: "post", label: "POST" },
            { id: "delete", label: "DELETE" },
            { id: "d", label: "la réponse d" },
          ],
        },
        {
          title: "Expresion regex",
          description:
            "Faire une expression regex qui permet de sortir les caractères \"A-a\" ou \"B-b\". \n La phrase qui doit être avoir les caractères entrés : \"Laurent Ruquier (malheureusement accompagné de Romy Schneider) se rapproche de quinze députés déterminés à aller jusqu'au bout.\" ",
          tests: [
            {
              params: [["1", "2", "3"], (element: string) => `test-${element}`],
              expected: ["test-1", "test-2", "test-3"],
            },
          ],
          forbiddenFunctions: [],
        }
      ]}
    />
  )
}

export default QuizDeveloper
