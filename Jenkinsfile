pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CRED = 'docker-hub-credentials'
        IMAGE_NAME = 'ramez14/jenkins-repo'
        CONTAINER_NAME = 'node-app-container'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'سحب الكود من GitHub...'
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo 'جاري بناء صورة دوكر (Docker Image)...'
                script {
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
                }
            } 
        }

        stage('3. Push to Docker Hub') {
            steps {
                echo 'تسجيل الدخول ورفع الصورة إلى Docker Hub...'
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CRED}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('4. Deploy Application') {
            steps {
                echo 'بدء نشر التطبيق على السيرفر...'
                script {
                    // إيقاف وحذف الكونتينر القديم إن وجد لعدم تعارض البورتات
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    
                    // سحب أحدث صورة وتشغيلها وربطها بالبورت الخارجي 5000
                    sh "docker pull ${IMAGE_NAME}:latest"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 5000:5000 ${IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        success {
            echo 'تم بناء التطبيق ورفعها ونشره بنجاح تام! 🚀'
        }
        failure {
            echo 'فشلت إحدى مراحل البناء أو النشر.'
        }
    }
}