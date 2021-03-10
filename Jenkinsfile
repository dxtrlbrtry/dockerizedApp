node('master') {
    withCredentials([
            string(credentialsId: 'mysql_root_password', variable: 'ROOT_PASS'),
            string(credentialsId: 'mysql_user', variable: 'mysql_user'),
            string(credentialsId: 'mysql_password', variable: 'mysql_password')
        ]) {
            withEnv(['MYSQL_USER=$mysql_user', 'ASD=asd']) {
                println(env.ASD)
                
           
stage('checkout') {
            println(env.ASD)
            println(env.ROOT_PASS)
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