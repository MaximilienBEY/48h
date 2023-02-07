import Quiz from "../../components/Quiz"

const QuizIntra = () => {
    return (
        <Quiz
            title="Infra"
            questions={[
                {
                    title: "Challenge Infra",
                    description: "Vous devez vous connectez sur une interface Web afin de récupérer un drapeau, vous avez à votre dispositions un switch avec des VLANs configurer, votre administrateur réseau n’étant pas très compétent, à vous de rajouter le VLAN permettant de vous connecter à ce serveur ou d’enlever un VLAN, vous pouvez utiliser le port qui est libre pour débranchez votre câble et initier la connexion avec le nouveau vlan une fois associer.\n" +
                        "Authentification : ch48h ch48h" +
                        "Quel est le drapeau (mot de passe) pour florence ?",
                    answer : "462m6rYWq5YRmh",
                }
            ]}
        />
    )
}

export default QuizIntra
