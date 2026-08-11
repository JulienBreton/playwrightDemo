pipeline {
    agent any

    tools {
        nodejs 'NodeJS_24-19-0'
    }

    environment {
        PLAYWRIGHT_SERVER = 'ws://192.168.1.18:3000/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}