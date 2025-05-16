pipeline {
    agent any

    stages {
        stage('instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('testes') {
            steps {
                sh 'chmod +x ./node_modules/.bin/cypress
                sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}



