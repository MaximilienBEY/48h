import Quiz from "../../components/Quiz"

const QuizDeveloper = () => {
  return (
    <Quiz
      title="Développeur"
      questions={[
        {
          title: "Question 1",
          description: 'Que renvoie "navigator.appName" si Google Chrome est utilisé ?',
          choices: [
            { id: "Mozilla", label: "Mozilla" },
            { id: "Netscape", label: "Netscape", isCorrect: true },
            { id: "le n° de version d'IE", label: "le n° de version d'IE" },
            { id: "une erreur", label: "une erreur" },
          ],
        },
        {
          title: "Question 2",
          description:
            "Quel objet permet au JavaScript de dialoguer avec un serveur web ?",
          choices: [
            { id: "XMLparseRequest", label: "XMLparseRequest" },
            { id: "XMLHttpRequest", label: "XMLHttpRequest", isCorrect: true },
            { id: "mysql_db_query", label: "mysql_db_query" },
            { id: "http_get_request", label: "http_get_request" },
          ],
        },
        {
          title: "Question 3",
          description: "Comment inverser un tableau T1 ?",
          choices: [
            { id: "T1.transpose()", label: "T1.transpose()" },
            { id: "T1.reverse()", label: "T1.reverse()", isCorrect: true },
            { id: "T1.inverse()", label: "T1.inverse()" },
            { id: "T1.rollout()", label: "T1.rollout()" },
          ],
        },
        {
          title: "Question 4",
          description:
            "Quel est l'équivalent pour un noeud de l'arbre DOM de node.childNodes[1] (en supposant que le noeud demandé existe) ?",
          choices: [
            { id: "node.firstChild", label: "node.firstChild" },
            {
              id: "node.firstChild.nextSibling",
              label: "node.firstChild.nextSibling",
              isCorrect: true,
            },
            {
              id: "node.previousSibling.parentNode",
              label: "node.previousSibling.parentNode",
            },
            {
              id: "node.lastChild.previousSibling",
              label: "node.lastChild.previousSibling",
            },
          ],
        },
        {
          title: "Question 5",
          description: "Lequel de ces codes n'affichera pas 3 ?",
          choices: [
            { id: "alert(Math.max(-4, 3));", label: "alert(Math.max(-4, 3));" },
            {
              id: "alert(Math.floor(2.9));",
              label: "alert(Math.floor(2.9));",
              isCorrect: true,
            },
            { id: "var i = 3; alert(i++);", label: "var i = 3; alert(i++);" },
            { id: 'alert(parseInt("3"));', label: 'alert(parseInt("3"));' },
          ],
        },
        {
          title: "Question 6",
          description: "Quel est le langage de programmation le plus utilisé en 2021 ?",
          choices: [
            { id: "Java", label: "Java" },
            { id: "C++", label: "C++" },
            { id: "Python", label: "Python", isCorrect: true },
            { id: "JavaScript", label: "JavaScript" },
          ],
        },
        {
          title: "Question 7",
          description: "Recréez la fonction suivante .map() en utilisant une boucle for.",
          tests: [
            {
              params: [[1, 2, 3], (x: number) => x * 2],
              expected: [2, 4, 6],
            },
            {
              params: [[1, 2, 3], (x: number) => (x % 2 ? null : x)],
              expected: [null, 2, null],
            },
            {
              params: [["a", "b", "c"], (x: string) => x.toUpperCase()],
              expected: ["A", "B", "C"],
            },
          ],
          forbiddenTerms: [/\.map/g, /forEach/g],
          response: `
const main = (array, callback) => {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]))
  }
  return result
}
          `.trim(),
        },
        {
          title: "Question 8",
          description:
            "Quelle est la différence entre les fonctions .map() et .forEach() ?",
          choices: [
            { id: "1", label: "forEach() ne retourne rien" },
            { id: "2", label: "forEach() retourne un tableau" },
            { id: "3", label: "map() ne retourne rien" },
            {
              id: "4",
              label: "map() retourne un tableau",
              isCorrect: true,
            },
          ],
        },
        {
          title: "Question 9",
          description:
            "Recréez la fonction suivante .filter() en utilisant une boucle for.",
          tests: [
            {
              params: [[1, 2, 3], (x: number) => x % 2],
              expected: [1, 3],
            },
            {
              params: [[1, 2, 3], (x: number) => x > 2],
              expected: [3],
            },
            {
              params: [["a", "b", "c"], (x: string) => x === "b"],
              expected: ["b"],
            },
          ],
          forbiddenTerms: [/\.filter/g, /forEach/g],
          response: `
const main = (array, callback) => {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) result.push(array[i])
  }
  return result
}
          `.trim(),
        },
      ]}
    />
  )
}

export default QuizDeveloper
