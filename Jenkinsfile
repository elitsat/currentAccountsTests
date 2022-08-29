pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.17.1'
    }
  }
  stages {
    stage('install playwright') {
     def workspace = WORKSPACE
        // ${workspace} will now contain an absolute path to job workspace on slave

        workspace = env.WORKSPACE
        // ${workspace} will still contain an absolute path to job workspace on slave

        // When using a GString at least later Jenkins versions could only handle the env.WORKSPACE variant:
        echo "Current workspace is ${env.WORKSPACE}"

        // the current Jenkins instances will support the short syntax, too:
        echo "Current workspace is $WORKSPACE"

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
