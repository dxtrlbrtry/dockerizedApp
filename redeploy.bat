docker-compose build app
docker-compose up -d
docker image prune -a -f
node tests/testRunner.js