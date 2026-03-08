pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'react-app'
        DOCKER_TAG = "build-${BUILD_NUMBER}"
        CONTAINER_NAME = 'react-app-container'
        APP_PORT = '3000'
    }

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        stage('📥 Checkout Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('🧪 Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('🏗️ Build React App') {
            steps {
                echo 'Building React app...'
                sh 'npm run build'
            }
        }

        stage('🐳 Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('🚀 Deploy Container') {
            steps {
                echo 'Deploying React app in Docker container...'

                // Stop and remove existing container if running
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                """

                // Run new container
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:80 \
                        --restart unless-stopped \
                        ${DOCKER_IMAGE}:latest
                """

                echo "✅ App deployed! Running on port ${APP_PORT}"
            }
        }

        stage('🧹 Cleanup Old Images') {
            steps {
                echo 'Removing old Docker images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline SUCCESS! Your React app is live!'
        }
        failure {
            echo '❌ Pipeline FAILED! Check the logs above.'
        }
    }
}
