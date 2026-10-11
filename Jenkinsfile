pipeline {
    agent any
    
    environment {
        // اسم مستخدم دوكر هاب والـ Repository
        DOCKER_HUB_CRED = 'docker-hub-credentials'
        IMAGE_NAME = 'raramez14/jenkins-repo/my-node-app'
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
                    // بناء الصورة وإعطاؤها Tag برقم الـ Build الحالي أو latest
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('3. Push to Docker Hub') {
            steps {
                echo 'تسجيل الدخول ورفع الصورة إلى Docker Hub...'
                script {
                    // استخدام الـ Credentials اللي حفظناها في Jenkins
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CRED}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'تم بناء الـ Docker Image ورفعها بنجاح إلى حسابك في Docker Hub! 🚀'
        }
        failure {
            echo 'فشلت عملية البناء أو الرفع، راجع الـ Logs.'
        }
    }
}