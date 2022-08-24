pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.25.0-focal'
    }
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm init playwright@latest
        '''
      }
    }

    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test
        '''
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}