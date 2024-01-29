dup:
		docker-compose up -d --build --remove-orphans
duu:
		docker-compose up -d
ddo:
		docker-compose down
dps:
		docker-compose ps -a
dlo: #make arg=portal dlo
		docker-compose logs $(arg) -f
dba:
		docker exec -it portal-app /bin/bash
dip:
		docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' portal-db
dms:
		docker-compose exec portal python manage.py makemigrations
dmm:
		docker-compose exec portal python manage.py migrate --noinput
gmg:
		git merge --no-ff master
dru:
		docker run
drb:
		docker run -it --rm portal:1.0 bash
dtg:
		docker image tag  portal:1.0 portal:1.0
dbu:
		docker build -t portal:1.0  .
dcr:
		docker-compose exec portal python manage.py createsuperuser --username='admin' --email=''
dcs:
		docker-compose exec portal python manage.py collectstatic
