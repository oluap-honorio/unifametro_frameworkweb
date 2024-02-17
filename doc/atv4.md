|  [Home](/README.md)  |  [Atividade 4](/doc/atv4.md)

*  Nesta página está descrito os passos para construir um container
*  Instalar:
   *  [VS code](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive)
   *  [Docker version 20.10.22](https://docs.docker.com/desktop/install/windows-install/) 
   *  [Atualizar kernel no Windows](https://learn.microsoft.com/pt-br/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)


### Primeiramente
1. Abra o terminal de comando.
```
cmd
```
2. Efetuar fork do repositorio [https://github.com/oluap-honorio/unifametro_frameworkweb](https://github.com/oluap-honorio/unifametro_frameworkweb)
3. Clonar o repositorio apos o fork
```
$ git clone https://github.com/<SEU LOGIN>/unifametro_frameworkweb.git
$ cd unifametro_frameworkweb
```
4. Gerar uma Branch com o seu nome.
```
$ git checkout -b NOME_SOBRENOME
$ git branch
```

### Setup do projeto:
1. Gere o ambiente inicial:
```
$ python -m venv env
```
2. Ativar o Ambiente Virtual:
```
$ env\Scripts\activate
```
3. Efetuar instalação das dependências Python
```
(env)$ pip install -r requirements.txt
```
4. Validar instalação
```
(env)$ python manage.py check
```
5. Encerrar o ambiente virtual
```
(env)$ deactivate
```

### Instruções para compilar a imagem Docker:
1. Criar um arquivo de texto *Dockerfile* dentro da pasota do prohjeto, no mesmo nível do manage.py
![Dockerfile](doc/df_local.png)

2. Insira as seguintes intruções:
```
# pull official base image
FROM python:3.10.6-alpine

# set work directory
WORKDIR /usr/src/unifametro_frameworkweb
ENV WORKDIR /usr/src/unifametro_frameworkweb

# set environment variables 
ENV PYTHONDONTWRITEBYTECODE 1 
ENV PYTHONUNBUFFERED 1 

# install dependencies 
RUN pip install --upgrade pip 
COPY ./requirements.txt . 
RUN pip install -r requirements.txt 

# copy project
COPY . .
```
   -  PYTHONDONTWRITEBYTECODE: Evita que o Python grave arquivos pyc no disco (equivalente a python -B option) 
   -  PYTHONUNBUFFERED: Evita que o Python armazene em buffer stdout e stderr (equivalente a python -u option)
[referência](https://mherman.org/presentations/dockercon-2018/#1)

3. Em seguida, adicionar o arquivo docker-compose.yml na mesma localização, com as seguintes instruções: 
```
version: '3.8'

services:
    portal:
        container_name: portal
        hostname: portal
        build:
            context: ../unifametro_frameworkweb
            dockerfile: Dockerfile
        command: python manage.py runserver 0.0.0.0:8000
        volumes:
            - .:/usr/src/unifametro_frameworkweb
        ports:
            - 8000:8000
        env_file:
            - ./.env.dev
```
[*referência*](https://docs.docker.com/compose/compose-file/)

4. Atualizar as variáveis SECRET_KEY, DEBUG e ALOWED_HOST no agrovinos/settings.py
   - Aplicar o import no topo do settings.py
```
# Aviable: os.path.join(BASE_DIR, ...)
import os

...

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1pm*crjz8*(dzocwtdd+e76ushzy(uku2pm12x#+&m*%^)d6ar'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

### Docker Config
DEBUG = int(os.environ.get("DEBUG", default=DEBUG))
SECRET_KEY = os.environ.get("SECRET_KEY", default=SECRET_KEY)
if os.environ.get("DJANGO_ALLOWED_HOSTS"):
    ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")
```
5. Então, criar um arquivo .env.dev (no mesmo nível do manage.py), com os valores das variáveis acima
```
DEBUG=1
SECRET_KEY=uniat3n3u2O23*8dkecue3*
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
```
6. Compilar a imagem Docker 
```
$ docker-compose build
7. Com uma imagen compilada, vamos rodar um container
```
$ docker-compose up -d
```
8. Para validar se o container está ativo execute o comanda ps
```
$ docker-compose ps
```
9. E para acmpanhar o log dos containers o comando é o logs
```
$ docker-compose logs -f
```
10. Ao acesso na URL o projeto Django vai apresentarr um erro pela falta das tabelas no banco de dados, neste caso vamos executar o comando migrate dentro do container
```
$ docker-compose exec portal python manage.py migrate --noinput
```
11. Por fim, derrubar a execução do container
```
$ docker-compose down -v
```

### Publicar atividade
1. Efetuar commit 
```
(env)$ git add .

(env)$ git commit -m "Finalizando Atividade 4"
```
2. Realizar push de Branch com o SEU NOME
```
(env)$ git push origin HEAD:**<NOME_SOBRENOME>**
```
3. Criar um Pull Request para o repositorio de origem do fork.
