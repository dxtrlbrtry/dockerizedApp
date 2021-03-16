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
            'DB_PORT='+ params.DB_PORT,
            'DATA_STORAGE_PATH=' + params.DATA_STORAGE_PATH,
            'LOGGING_LEVEL=' + params.LOGGING_LEVEL
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
                bat "docker-compose up -d app"
                bat "docker image prune -f"
            }
            try {
                stage('run tests') {
                    //bat "docker-compose up tests"
                    bat "docker run --network=host -e APP_HOST=localhost -e APP_PORT=" + env.APP_PORT + " -e LOGGING_LEVEL=1 -v '" + pwd() + "/tests/:/app/tests/' -v common:/app/common/ tests"
                    def jsonReport = readJSON file: 'tests/reports/report.json'
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
                    archiveArtifacts artifacts: 'tests/reports/report.json', followSymlinks: false
                }
            }
        }
    }
}