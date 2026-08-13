pipeline {
    agent any

    tools {
        nodejs 'NodeJS_24-19-0'
    }

    environment {
        // Force l'injection de la variable pour Node.js
        CI = 'true'
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
                sh 'rm -rf allure-results'
                // Lance la config CI (qui se connecte au serveur Docker)
                sh 'npm run test:ci'
            }
        }
    }

    post {
            always {
                // Publie le rapport HTML dans l'interface Jenkins
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Rapport Playwright',
                    reportTitles: 'Rapport de Test'
                ])
                // Génère et publie le rapport Allure dans l'interface Jenkins
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                 results: [[path: 'allure-results']]
                ])
            }
    }
}

