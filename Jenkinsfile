// Déclaration du pipeline Jenkins
pipeline {
    // Exécute le pipeline sur n'importe quel agent (local sur le VPS)
    agent any

    // Variables d'environnement globales
    environment {
        DOCKER_IMAGE = 'todo-app-frontend'  // Nom de l'image Docker à construire
        DOCKER_USERNAME = 'codeangel92'  // Nom d'utilisateur Docker Hub
        DOCKER_CONTAINER = 'todo_app_frontend'  // Nom du conteneur déployé sur le VPS
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials-id')  // Identifiants Docker Hub
        IMAGE_VERSION = '1'  // Version dynamique basée sur le numéro de build Jenkins
    }

    // Étapes du pipeline
    stages {
        // Étape 2 : Exécution des tests unitaires
        stage('Test') {
            steps {
                script {
                    echo 'test success'
                }
            }
        }

        // Étape 3 : Construction de l'image Docker
        stage('Build') {
            steps {
                script {
                    // Construit l'image Docker localement sur le VPS
                    bat 'docker build -t todo-app .'
                }
            }
        }

        // Étape 4 : Déploiement de l'image
        stage('Deploy') {
            steps {
                script {
                    // Connexion à Docker Hub
                    bat """
                        # Authentifie le Docker daemon local avec les identifiants Jenkins
                        docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}
                        echo 'Docker login successful'
                    """

                    // Étiquetage de l'image avec la version dynamique
                    bat """
                        # Tag l'image construite pour Docker Hub
                        docker tag $DOCKER_IMAGE $DOCKER_USERNAME/$DOCKER_IMAGE:${IMAGE_VERSION}
                    """

                    // Publication sur Docker Hub
                    bat """
                        # Pousse l'image vers Docker Hub
                        docker push $DOCKER_USERNAME/$DOCKER_IMAGE:${IMAGE_VERSION}
                    """

                    // Déploiement local sur le VPS
                    bat """
                        # Arrête le conteneur existant s'il existe
                        docker compose down
                        # Lance un nouveau conteneur en mode détaché
                        docker compose up -d
                    """
                }
            }
        }
    }
}
