// Pipeline Jenkins declarativo para Reto 3 - Automatización Mobile
//
// Stages:
//   1. Checkout
//   2. Install dependencies
//   3. Lint (TS check)
//   4. Test Android (emulador local en el agente)
//   5. Test iOS (SauceLabs cloud)
//   6. Allure Report
//   7. Archive artifacts
//
// Credenciales necesarias en Jenkins (Manage Jenkins > Credentials):
//   - sauce-username  (Secret text)
//   - sauce-access-key (Secret text)

pipeline {
    agent any

    options {
        timeout(time: 45, unit: 'MINUTES')
        ansiColor('xterm')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        NODE_VERSION = '22'
        SAUCE_USERNAME = credentials('sauce-username')
        SAUCE_ACCESS_KEY = credentials('sauce-access-key')
        SAUCE_REGION = 'us-west-1'
        SAUCE_IOS_APP = 'storage:filename=My-Demo-App.ipa'
    }

    parameters {
        booleanParam(name: 'RUN_ANDROID', defaultValue: true, description: 'Ejecutar tests Android')
        booleanParam(name: 'RUN_IOS', defaultValue: true, description: 'Ejecutar tests iOS en SauceLabs')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('TypeScript check') {
            steps {
                sh 'npx tsc --noEmit'
            }
        }

        stage('Test Android (local emulator)') {
            when { expression { return params.RUN_ANDROID } }
            steps {
                script {
                    // Levantar emulador (asume que el agente Jenkins tiene Android SDK)
                    sh '''
                        $ANDROID_HOME/emulator/emulator -avd Pixel_6_API_34 -no-window -no-audio &
                        $ANDROID_HOME/platform-tools/adb wait-for-device
                        $ANDROID_HOME/platform-tools/adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done'
                    '''
                    sh 'npm run test:android'
                }
            }
            post {
                always {
                    sh '$ANDROID_HOME/platform-tools/adb emu kill || true'
                }
            }
        }

        stage('Test iOS (SauceLabs)') {
            when { expression { return params.RUN_IOS } }
            steps {
                sh 'npm run test:ios'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run report:generate || true'
            }
        }
    }

    post {
        always {
            // Reporte Allure como plugin de Jenkins
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // Archivar artefactos (screenshots, reportes, logs)
            archiveArtifacts artifacts: 'allure-report/**, screenshots/**, logs/**',
                             allowEmptyArchive: true,
                             fingerprint: true
        }
        success {
            echo 'Pipeline ejecutado correctamente.'
        }
        failure {
            echo 'Pipeline falló. Revisar reporte Allure y screenshots.'
        }
    }
}
