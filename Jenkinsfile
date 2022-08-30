pipeline {
  agent any
  stages {
    stage('Checkout Scm') {
      steps {
        git 'https://github.com/elitsat/currentAccountsTests.git'
      }
    }

    stage('Batch script 0') {
      steps {
        bat '''dir
        npm init playwright@latest
        npx playwright install
npx playwright test --list'''
      }
    }

    stage('Batch script 1') {
      steps {
        bat '''npm run e2e
npm run showReport'''
      }
    }

  }
}