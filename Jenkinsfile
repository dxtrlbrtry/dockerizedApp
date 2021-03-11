node('master') {
    withCredentials([
            string(credentialsId: 'mysql_root_password', variable: 'MYSQL_ROOT_PASSWORD'),
            string(credentialsId: 'mysql_user', variable: 'MYSQL_USER'),
            string(credentialsId: 'mysql_password', variable: 'MYSQL_PASSWORD')
    ]) {
        withEnv([
            'MYSQL_DATABASE=' + params.MYSQL_DATABASE,
            'APP_PORT=' + params.APP_PORT,
            'APP_HOST='+ params.APP_HOST,
            'DB_PORT='+ params.DB_PORT
        ]) {   
            stage('checkout') {
                git branch: params.BRANCH, credentialsId: 'git_credentials', url: 'https://github.com/dxtrlbrtry/dockerizedApp.git'
            }
            stage('rebuild app') {
                if (params.REBUILD_APP) {
                    bat "docker-compose build app"
                }
                if (params.REBUILD_TESTS) {
                    bat "docker-compose build tests"
                }
                bat "docker-compose up -d"
                bat "docker image prune -a -f"
            }
            def reportPath = 'tests/reports/report.json'
            try {
                stage('run tests') {
                    bat 'docker exec -w /app/ testpipeline_tests_1 /bin/sh -c "node tests/testRunner.js'
                    bat "docker cp testpipeline_tests_1:/app/" + reportPath + " " + reportPath

                    def jsonReport = readJSON file: reportPath
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
                    archiveArtifacts artifacts: reportPath, followSymlinks: false
                }
            }
        }
    }    
}