|  [Home](/README.md)  |  [Atividade 7](/doc/atv7.md)

*  Nesta página está descrito os passos para gerar aplicação REST

### Instalando o Django Rest Framework

1. Derrubar container Docker
```
docker-compose down -v
```
2. Ativar ambientevirtual
```
env\Scripts\activate
```
3. Instalar o pacote rest_framework com pip
```
pip install djangorestframework
```
4. Atualizar o requirement.txt
```
djangorestframework==3.14.0
```
5. Atualizar a variável INSTALLED_APPS no agrovinos/settings.py 
```
INSTALLED_APPS = [
    'ovino.apps.OvinoConfig',
    'tag.apps.TagConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'sekizai',
    'widget_tweaks',
    'rest_framework',
]
```
### Configurando o Django Rest Framework
1. No modelo vamos utilizar a a classe **Tag** na aplicação tag/models.py Garantir que a PK do modelo seja o padrão uuid
```
id = models.UUIDField(    primary_key=True,default=uuid.uuid4,null=False,blank=True)
```
1. Atualizar migrations
2. Aplicar migrate
3. Configurar o serializer no arquivo tag/serializers.py
4. Configurar ViewSets no tag/views.py
5. Prover rotas no tag/urls.py
6. Publicar as URLS no agrovinos/urls.py

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