pipeline {
    agent {
        docker {
        customWorkspace '/c/ProgramData/Jenkins/jenkins/workspace/Current Accounts Tests'
          image 'mcr.microsoft.com/playwright:v1.24.0-focal'
        }
      }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}