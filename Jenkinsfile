pipeline {
    agent {
        docker {
            // Utilise l'image officielle Playwright correspondant à la version de ton package.json
            image 'mcr.microsoft.com/playwright:v1.62.1-noble'
            // Option nécessaire pour que le conteneur ait les droits de créer/écrire dans le workspace Jenkins
            args '-u root:root'
        }
    }

    // Conservation des builds et des rapports pour éviter de saturer le disque du serveur
    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // 'npm ci' est recommandé en CI/CD : plus rapide et plus strict que 'npm install'
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Exécute le script "test" défini dans ton package.json (mode headless par défaut)
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive le rapport HTML Playwright et les preuves (screenshots/tracé/vidéos) dans Jenkins
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Archive les vidéos/screenshots de test en tant qu'artefacts Jenkins si besoin
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}