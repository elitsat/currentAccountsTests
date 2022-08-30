pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('install playwright') {
      steps {
        bat '''
          npm install
        '''
      }
    }

    stage('test') {
      steps {
        bat '''
          npm run test
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

