import Quiz from "../../components/Quiz"

const QuizCyber = () => {
  return (
    <Quiz
      title="Cyber sécurité"
      questions={[
        {
          title: "Cyber 1",
          description:
            "Quel terme est utilisé pour décrire une action visant a retrouver un message en clair sans posséder la clé de déchiffrement ?",
          choices: [
            { id: "decoder", label: "Décoder" },
            { id: "decrypter", label: "Décrypter", isCorrect: true },
            { id: "dechiffrer", label: "Déchiffrer" },
          ],
        },
        {
          title: "Cyber 2",
          description:
            "Quel outil cryptographique utilise-t-on pour s’assurer que la bi clé utilisée pour signer un document appartient bien a notre correspondant ?",
          choices: [
            { id: "chiffrement", label: "Chiffrement asymétrique" },
            { id: "signature", label: "La signature numérique" },
            { id: "certificat", label: "Certificat électronique", isCorrect: true },
          ],
        },
        {
          title: "Cyber 3",
          description: "Le protocole utilisé pour sécuriser les échanges d'e-mails est :",
          choices: [
            { id: "stmp", label: "STMP" },
            { id: "pgp", label: "PGP", isCorrect: true },
            { id: "snmp", label: "SNMP" },
            { id: "http", label: "HTTP" },
          ],
        },
        {
          title: "Cyber 4",
          description:
            "Lequel des termes suivants est spécifiquement conçu pour leurrer et attirer les pirates ?",
          choices: [
            { id: "ids", label: "IDS" },
            { id: "ips", label: "IPS" },
            { id: "honeypot", label: "Honey pot (pot de miel)", isCorrect: true },
            { id: "teardrop", label: "TearDrop" },
          ],
        },
        {
          title: "Cyber 5",
          description: "Qu'est-ce qu'un hacker ?",
          choices: [
            {
              id: "identifie",
              label:
                "Une personne qui identifie les failles des systèmes de sécurité pour percer dans dans des systèmes informatiques a des fins malveillante.",
              isCorrect: true,
            },
            {
              id: "exploite",
              label:
                "Une personne qui exploite de manière non éthique les informations sensibles et utilise les failles des systèmes à son avantage.",
            },
            {
              id: "agit",
              label:
                "Une personne qui agit de manière ethique qui realise des test d'intrusion pour améliorer la sécurité d'un système.",
            },
          ],
        },
        {
          title: "Cyber 6",
          description: "L'art de casser des chiffres est connu comme :",
          choices: [
            { id: "cryptographie", label: "Cryptographie" },
            { id: "cryptanalyse", label: "Cryptanalyse", isCorrect: true },
            { id: "cryptologie", label: "Cryptologie" },
            { id: "cryptage", label: "Cryptage" },
          ],
        },
        {
          title: "Cyber 7",
          description:
            "Le chiffrement et le déchiffrement des données est ma responsabilité de quelle couche ?",
          choices: [
            { id: "session", label: "Couche de session" },
            { id: "transport", label: "Couche de transport" },
            { id: "reseau", label: "Couche réseau" },
            { id: "presentation", label: "Couche de présentation", isCorrect: true },
          ],
        },
        {
          title: "Cyber 8",
          description:
            "Quels problème la signature numérique et les certificats électroniques permettent t’ils de resoudres ?",
          choices: [
            { id: "cle", label: "La distribution des clés" },
            { id: "confidentialite", label: "La confidentialité des données" },
            {
              id: "integrite",
              label: "L’intégrité d'une donnée et la preuve de provenance",
              isCorrect: true,
            },
          ],
        },
        {
          title: "Cyber 9",
          description:
            "Saississez le nom de la technique qui combine l’utilisation de chiffrement symétrique et d’un chiffrement asymétrique",
          answer: "hybride",
        },
      ]}
    />
  )
}

export default QuizCyber
