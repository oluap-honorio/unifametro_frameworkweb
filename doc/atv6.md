|  [Home](/README.md)  |  [Atividade 6](/doc/atv6.md)

*  Nesta página está descrito os passos para aplicar SGBD para PostgreSQL e prover restrição de acesso aos métodos

### Gear um acesso sem privilégios de administrador:
1. Ativar novamente o Ambiente Virtual e cadastrar usuário admin:
```
$ env\Scripts\activate
$ python manage.py createsuperuser --email admin@unifametro.br --username admin
```
2. Acessa o [admin](http://127.0.0.1:8000/admin/) no navegador
3. Cadastrar um usuário sem privilégios de administração
- Nome: *user*
- Senha: *pass.123*
4. Atribuir para ele a permissão **ovino | ovino | Can add ovino**
5. Ajusta o idioma do projeto Django, atualizando a variável LANGUAGE_CODE no agrovinos/settings.py 
```
LANGUAGE_CODE = 'pt-br'
``` 

### Criando uma nova aplicação
1. Adicione a aplicação **tag** ao projeto agrovinos
``` 
$ python manage.py startapp tag
``` 
2. Casdatre ela na variável INSTALLED_APPS no agrovinos/settings.py
``` 
# Application definition

INSTALLED_APPS = [
    'ovino.apps.OvinoConfig',
    'tag.apps.TagConfig',
``` 
3. Criar o modelo Tag na nova aplicação, no tag/models.py
``` 
from django.db import models
import uuid


class Tag(models.Model):
    
    serial = models.CharField(max_length=16, unique=True)
    id = models.UUIDField(    primary_key=True,default=uuid.uuid4,null=False,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.serial
``` 
4. Adicionar a tag no modelo do ovino em ovino/models.py
``` 
from django.db import models
from tag.models import Tag


class Ovino(models.Model):
    
    tag = models.OneToOneField(Tag, on_delete=models.SET_NULL, null=True)
```
5. Adicionar a tag no formulário em ovino/forms.py
``` 
fields = [
    "identificador",
    "peso",
    "nascimento",
    "raca",
    "cor",
    "genero",
    "tag",
]
``` 
6. Atualizar os migrations
``` 
$ python manage.py makemigrations
``` 
1. Atializa a base de dados
``` 
$ python manage.py migrate
``` 

### Mapear uma aplciação no Django Administrator
1. Registrar a aplicação tag no Django Admin, no tag/admins.py
```
from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Tag)
```
2. Acesse novamente o [admin](http://127.0.0.1:8000/admin/) para ver o CRUD da aplciação Tag.    

### Prover carga de dados na base de dados com o Django Fixtures
1. Vamos cadastrar algumas tags e ovinos
2. Gerar um seed
```
$ python manage.py dumpdata > data.json
```
3. Carregar um seed
```
$ del db.sqlite3
$ python manage.py migrate
$ python manage.py loaddata data.json
```
### Aplicar SGBD PostgreSQL
1. Adicionar dependencias do postgres no docker-compose.yml
```
        env_file:
            - ./.env.dev
        depends_on:
        - banco

    banco:
        container_name: banco
        hostname: banco
        image: postgres:14.6-alpine
        restart: unless-stopped
        volumes:
        - postgres_data:/var/lib/postgresql/data/
        ports:
        - 19000:5432
        environment:
        - POSTGRES_USER=admin
        - POSTGRES_PASSWORD=lc3.2023
        - POSTGRES_DB=smallDB
        - TZ=GMT-3
        
volumes:
    postgres_data:
```   
2. Adicionar configurrações od banco no arquivo .env.dev
```
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=smallDB
SQL_USER=admin
SQL_PASSWORD=lc3.2023
SQL_HOST=banco
SQL_PORT=5432
```
3. Atualizar a variável DATABASES no agrovinos/settings.py
```
DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, 'db.sqlite3')),
        "USER": os.environ.get("SQL_USER", "admin"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "1234"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}

```
4. Adicionar instalação do driver no Dockerfile
```
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
 && apk add postgresql-dev gcc python3-dev musl-dev
```
5. Instalar requirements.txt
```
psycopg2-binary==2.9.1
```
6. Recompilar e erguer o container
```
$  docker-compose up -d --build
```
7. Aplicar os migrations
```
 docker-compose exec banco psql --username=hello_django --dbname=hello_django_dev
```


### Publicar atividade
1. Efetuar commit 
```
(env)$ git add .
(env)$ git commit -m "Finalizando Atividade 5"
```
2. Realizar push de Branch com o SEU NOME
```
(env)$ git push origin HEAD:**<NOME_SOBRENOME>**
```
3. Caso o Pull Request da atividade anterior não tenha se atualizado automaticamente, crie um novo para o repositorio de origem do fork.