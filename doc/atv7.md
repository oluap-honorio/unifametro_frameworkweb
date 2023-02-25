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

2. Atualizar migrations
```
$ python manage.py makemigrations
```
3. Aplicar migrate
```
$ python manage.py migrate
```
4. Configurar o serializer no arquivo tag/serializers.py
```
from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = [
      'id',
      'created_at',
      'updated_at',
      'serial'
    ]
```
5. Configurar ViewSets no tag/views.py
```
from .serializers import TagSerializer
from rest_framework import viewsets, permissions
from .models import Tag


class TagViewSet(viewsets.ModelViewSet):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer
  permission_classes = [permissions.IsAuthenticated]
``` 
7. Prover rotas no tag/urls.py
```
from rest_framework.routers import DefaultRouter
from .views import TagViewSet


app_name = 'tag'

router = DefaultRouter(trailing_slash=False)
router.register(r'tag', TagViewSet)

urlpatterns = router.urls
```
7. Publicar as URLS no final de agrovinos/urls.py
```
urlpatterns += [
  path('tag/v1/', include('tag.urls', namespace='tag')),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```
1. Acessao documentação na [api REST](http://127.0.0.1:8000/tag/v1/) 

### Publicar atividade
1. Efetuar commit 
```
(env)$ git add .

(env)$ git commit -m "Finalizando Atividade 7"
```
2. Realizar push de Branch com o SEU NOME
```
(env)$ git push origin HEAD:**<NOME_SOBRENOME>**
```
3. Caso o Pull Request da atividade anterior não tenha se atualizado automaticamente, crie um novo para o repositorio de origem do fork.