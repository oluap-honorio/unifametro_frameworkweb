dup:
		docker-compose up -d --build --remove-orphans
duu:
		docker-compose up -d
ddo:
		docker-compose down
dps:
		docker-compose ps -a
dlo: #make arg=uniframe-app dlo
		docker-compose logs $(arg) -f
dba:
		docker exec -it uniframe-app /bin/bash
dip:
		docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' uniframe-db
dms:
		docker-compose exec portal python manage.py makemigrations
dmm:
		docker-compose exec portal python manage.py migrate --noinput
gmg:
		git merge --no-ff master
dru:
		docker run
drb:
		docker run -it --rm uniframe:1.0 bash
dtg:
		docker image tag  uniframe:1.0 uniframe:1.0
dbu:
		docker build -t uniframe:1.0  .



