pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.17.1'
    }
  }
  stages {
    stage('install playwright') {
      steps {
        bat '''
          npm init playwright@latest
        '''
      }
    }

    stage('test') {
      steps {
        bat '''
          npx playwright test --list
          npx playwright test
        '''
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          bat 'rm -rf *.png'
        }
      }
    }
  }
}

