node('master') {
    withCredentials([
            string(credentialsId: 'mysql_root_password', variable: 'MYSQL_ROOT_PASSWORD'),
            string(credentialsId: 'mysql_user', variable: 'MYSQL_USER'),
            string(credentialsId: 'mysql_password', variable: 'MYSQL_PASSWORD')
    ]) {
        withEnv(['MYSQL_USER=' + env.MYSQL_USER, 
        'MYSQL_PASSWORD=' + env.MYSQL_PASSWORD, 
        'MYSQL_ROOT_PASSWORD=' + env.MYSQL_ROOT_PASSWORD]) {   
            stage('checkout') {
                git branch: 'main', credentialsId: 'git_credentials', url: 'https://github.com/dxtrlbrtry/dockerizedApp.git'
            }
            stage('rebuild app') {
                bat "docker-compose build app"
                bat "docker-compose up -d"
                bat "docker image prune -a -f"
            }
            def reportPath = '/tests/reports/'
            try {
                stage('run tests') {
                    bat 'docker run --rm -d -v "' + pwd() + reportPath + '":"/usr/src/app' + reportPath + '" tests node tests/testRunner.js'
                    //bat 'docker exec -t testpipeline_tests_1 /bin/sh -c "node tests/testRunner.js"'
                    //docker.image('testpipeline_tests_1').inside('-v "' + pwd() + reportPath + '":"/usr/src/app/' + reportPath + '"') {
                    //    sh 'ls'
                    //    sh 'node tests/testRunner.js'
                    //}
                    //bat "docker cp testpipeline_app_1:/usr/src/app/" + reportPath + " " + reportPath

                    def jsonReport = readJSON file: reportPath + 'report.json'
                    for (fixture in jsonReport.fixtures) {
                        for (test in fixture.tests) {
                            for (error in test.errs) {
                                echo error
                                currentBuild.result = 'UNSTABLE'
                            }
                        }
                    }
                }
            }
            finally {
                stage('archive') {
                    archiveArtifacts artifacts: reportPath + '/**/*.*', followSymlinks: false
                }
            }
        }
    }    
}