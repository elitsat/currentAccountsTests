pipeline {
    agent {
        docker {
        customWorkspace '/ProgramData/Jenkins/jenkins/workspace/playwright'
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