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
4. Atualizar os migrations
``` 
$ python manage.py makemigrations
``` 
5. Atializa a base de dados
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

### ToDo
1. todo

### ToDo
1. todo

### ToDo
1. todo

### ToDo
1. todo

### ToDo
1. todo

### ToDo
1. todo

### ToDo
1. todo

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