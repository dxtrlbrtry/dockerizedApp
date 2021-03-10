node('master') {
    withCredentials([
            string(credentialsId: 'mysql_root_password', variable: 'root_pass'),
            string(credentialsId: 'mysql_user', variable: 'username'),
            string(credentialsId: 'mysql_password', variable: 'passw')
        ]) {
            withEnv(['MYSQL_USER=${username}', 'MYSQL_PASSWORD=${passw}', 'MYSQL_ROOT_PASSWORD=${root_pass}']) {
                
           
stage('checkout') {
            println(env.root_pass)
            git branch: 'main', credentialsId: 'git_credentials', url: 'https://github.com/dxtrlbrtry/dockerizedApp.git'
        }
        stage('rebuild app') {
            bat "docker-compose build app"
            bat "docker-compose up -d"
            bat "docker image prune -a -f"
        }
        def reportPath = 'tests/reports/report.json'
        try {
            stage('run tests') {
                bat 'docker exec -t testpipeline_app_1 /bin/sh -c "node tests/testRunner.js"'
                bat "docker cp testpipeline_app_1:/usr/src/app/" + reportPath + " " + reportPath

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