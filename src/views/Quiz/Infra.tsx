import Quiz from "../../components/Quiz"

const QuizIntra = () => {
  return (
    <Quiz
      title="Infra"
      questions={[
        {
          title: "Challenge Infra",
          description:
            "Connectez-vous à une interface Web pour récupérer un drapeau en utilisant un switch avec des VLANs configurés. Modifiez le VLAN pour vous connecter au serveur ou enlevez-en un. Utilisez un port libre pour débrancher et reconnecter avec le nouveau VLAN." +
            " Quel est le drapeau (mot de passe) pour Florence ?" +
            " Authentification : ch48h ch48h.",
          answer: "462m6rYWq5YRmh",
        },
      ]}
    />
  )
}

export default QuizIntra
