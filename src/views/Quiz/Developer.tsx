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
        {
          title: "Question 10",
          description:
            "Quel est l'opérateur qui permet de savoir le type de la variable en js ?",
          choices: [
            { id: "typeof", label: "typeof", isCorrect: true },
            { id: "instanceof", label: "instanceof" },
            { id: "oftype", label: "oftype" },
            { id: "keyof", label: "keyof" },
          ],
        },
        {
          title: "Question 11",
          description: "Quelles sont les variables 'Super Global' en php ?",
          choices: [
            { id: "get", label: "$_GET", isCorrect: true },
            { id: "admin", label: "$_ADMIN" },
            { id: "session", label: "$_SESSION", isCorrect: true },
            { id: "files", label: "$_FILES", isCorrect: true },
          ],
        },
        {
          title: "Question 12",
          description:
            "Recréez la fonction trim() sans utilisé trim(), trimEnd() et trimStart().",
          tests: [
            {
              params: [" both ", " ", " left", "right "],
              expected: ["both", "", "left", "right"],
            },
          ],
          forbiddenTerms: [/trim/g, /trimEnd/g, /trimStart/g],
          response: `
const main = (str) => {
  return str.replace(/^\\s+|\\s+$/g, '')
}
          `.trim(),
        },
        {
          title: "Question 13",
          description:
            "Comment rendre un code comme sur l'image (lien de l'image: https://fr.w3docs.com/uploads/media/default/0001/02/8f6451c9f351a5ec7a645c5503d1dd9d08b8bb7e.png)",
          choices: [
            { id: "code", label: "<code></code>" },
            { id: "style", label: "<style></style>" },
            { id: "pre", label: "<pre></pre>", isCorrect: true },
            { id: "dd", label: "<dd></dd>" },
          ],
        },
        {
          title: "Question 14",
          description: 'Que représente ":" dans ce script ":href="url"" en vuejs ?',
          choices: [
            { id: "for", label: "v-for" },
            { id: "bind", label: "v-bind", isCorrect: true },
            { id: "if", label: "v-if" },
            { id: "on", label: "v-on", isCorrect: true },
          ],
        },
        {
          title: "Question 15",
          description: "Quelles sont les méthodes HTTP ?",
          choices: [
            {
              id: "crud",
              label: "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH",
              isCorrect: true,
            },
            {
              id: "error",
              label: "PING, SYNC, DISCONNECT, REFRESH, REBOOT, DOWNLOAD, UPLOAD, ABORT.",
            },
            {
              id: "error2",
              label: "LOGIN, LOGOUT, SAVE, RETRIEVE, QUERY, RESET, FETCH, SEND.",
            },
            {
              id: "error3",
              label:
                "REQUEST, RESPONSE, PUBLISH, SUBSCRIBE, NOTIFY, ACKNOWLEDGE, POLL, PUSH",
            },
          ],
        },
        {
          title: "Question 16",
          description:
            "La méthode ___ exige une représentation de la ressource désignée. \nLes requêtes ___ doivent seulement servir à récupérer des données.",
          choices: [
            { id: "get", label: "GET", isCorrect: true },
            { id: "post", label: "POST" },
            { id: "delete", label: "DELETE" },
            { id: "patch", label: "PATCH" },
          ],
        },
        {
          title: "Question 17",
          description: "Recréez la fonction .reduce() en utilisant une boucle for.",
          tests: [
            {
              params: [[1, 2, 3], (x: number, y: number) => x + y],
              expected: 6,
            },
            {
              params: [[1, 2, 3], (x: number, y: number) => x * y],
              expected: 6,
            },
            {
              params: [["a", "b", "c"], (x: string, y: string) => x + y],
              expected: "abc",
            },
          ],
          forbiddenTerms: [/\.reduce/g, /forEach/g],
          response: `
const main = (array, callback) => {
  let result = array[0]
  for (let i = 1; i < array.length; i++) {
    result = callback(result, array[i])
  }
  return result
}
          `.trim(),
        },
        {
          title: "Question 18",
          description:
            "Lorsque j'utilise HTTP, qui peut avoir accès aux données échangées ?",
          choices: [
            {
              id: "Le client web (navigateur)",
              label: "Le client web (navigateur)",
              isCorrect: true,
            },
            {
              id: "Le serveur Web distant",
              label: "Le serveur Web distant",
              isCorrect: true,
            },
            {
              id: "Les personnes qui inspectent le trafic sur le réseau",
              label: "Les personnes qui inspectent le trafic sur le réseau",
              isCorrect: true,
            },
            {
              id: "Mon fournisseur d'accès à Internet",
              label: "Mon fournisseur d'accès à Internet",
              isCorrect: true,
            },
          ],
        },
        {
          title: "Question 19",
          description:
            "Lorsque j'utilise HTTPS, qui peut avoir accès aux données échangées ?",
          choices: [
            {
              id: "Le client web (navigateur)",
              label: "Le client web (navigateur)",
              isCorrect: true,
            },
            {
              id: "Le serveur Web distant",
              label: "Le serveur Web distant",
              isCorrect: true,
            },
            {
              id: "Les personnes qui inspectent le trafic sur le réseau",
              label: "Les personnes qui inspectent le trafic sur le réseau",
            },
            {
              id: "Mon fournisseur d'accès à Internet",
              label: "Mon fournisseur d'accès à Internet",
            },
          ],
        },
        {
          title: "Question 20",
          description:
            "Quels usages non légitime les autorités de certification pourraient avoir de leur pouvoir ?",
          choices: [
            {
              id: "Créer des certificats usurpant l'identité d'autres sites",
              label: "Créer des certificats usurpant l'identité d'autres sites",
              isCorrect: true,
            },
            {
              id: "Permettre, par manque de sécurisation de ses certificats, à des pirates d'obtenir la possibilité de créer des certificats eux-mêmes",
              label:
                "Permettre, par manque de sécurisation de ses certificats, à des pirates d'obtenir la possibilité de créer des certificats eux-mêmes",
              isCorrect: true,
            },
            {
              id: "Désactiver l'accès à un site web dans un navigateur",
              label: "Désactiver l'accès à un site web dans un navigateur",
            },
          ],
        },
        {
          title: "Question 21",
          description:
            "Lequels des éléments suivants ne sont pas des frameworks d'applications web Node.js?",
          choices: [
            { id: "Aurelie", label: "Aurelie", isCorrect: true },
            { id: "Geddy", label: "Geddy" },
            { id: "Cassandra", label: "Cassandra" },
            { id: "Beatrice", label: "Beatrice", isCorrect: true },
          ],
        },
        {
          title: "Question 22",
          description:
            "Quelle est la meilleure pratique à appliquer dans votre code pour améliorer les performances de votre application ?",
          choices: [
            {
              id: "Utiliser la compression gzip.",
              label: "Utiliser la compression gzip.",
              isCorrect: true,
            },
            {
              id: "Ne pas utiliser de fonctions synchrones.",
              label: "Ne pas utiliser de fonctions synchrones.",
            },
            {
              id: "Faire la journalisation correctement.",
              label: "Faire la journalisation correctement.",
            },
            {
              id: "Gérer les exceptions correctement.",
              label: "Gérer les exceptions correctement.",
            },
          ],
        },
        {
          title: "Question 23",
          description:
            "Lequel des éléments suivants est utilisé pour tester si deux nœuds sont égaux ?",
          choices: [
            { id: "==", label: "==" },
            { id: "equal()", label: "equal()" },
            { id: "isEqualNode()", label: "isEqualNode()", isCorrect: true },
          ],
        },
        {
          title: "Question 24",
          description:
            "Lequel des éléments suivants est utilisé pour tester si deux nœuds sont égaux ?",
          choices: [
            { id: "Applications à page unique", label: "Applications à page unique" },
            {
              id: "Applications basées sur des APIs JSON",
              label: "Applications basées sur des APIs JSON",
            },
            {
              id: "Applications à usage intensif du CPU",
              label: "Applications à usage intensif du CPU",
              isCorrect: true,
            },
            {
              id: "Applications en temps réel à forte intensité de données (DIRT)",
              label: "Applications en temps réel à forte intensité de données (DIRT)",
            },
          ],
        },
      ]}
    />
  )
}

export default QuizDeveloper
