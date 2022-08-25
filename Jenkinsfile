pipeline {
    agent any
    stages {
        stage('Many tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.17.1'
                }
            }
            environment {
                              HOME="."
                            }
            steps {

                bat 'npx playwright test'
            }
        }
    }
}