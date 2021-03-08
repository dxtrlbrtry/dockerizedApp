node('master') {
    stage('checkout') {
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
            println(pwd())
            docker.image('testpipeline_app_1').inside("-v " + pwd() + "/tests/reports:/usr/src/app/tests/reports") {
                sh 'node tests/testRunner.js'
            }
            bat 'docker ps -a'
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