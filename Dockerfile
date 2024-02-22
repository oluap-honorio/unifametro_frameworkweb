# pull official base image
FROM python:3.10.6-alpine
USER root

# set work directory
WORKDIR /usr/src/unifametro_frameworkweb
ENV WORKDIR /usr/src/unifametro_frameworkweb

ENV PIP_ROOT_USER_ACTION ignore
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
#PYTHONDONTWRITEBYTECODE: Evita que o Python grave arquivos pyc no disco (equivalente a python -B option)
ENV PYTHONUNBUFFERED 1
#PYTHONUNBUFFERED: Evita que o Python armazene em buffer stdout e stderr (equivalente a python -u option)

# install psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libpq-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install --root-user-action=ignore psycopg2-binary
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate --noinput
# copy project
COPY . .
