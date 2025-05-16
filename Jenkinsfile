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
                sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}



