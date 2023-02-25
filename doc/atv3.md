|  [Home](/README.md)  |  [Atividade 3](/doc/atv3.md)

*  Nesta página está descrito os passos para fazer um CRUD dos carneiros
*  Instalar [VS code](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive)

### Construir uma aplicação CRUD com Django
1. Pegar uma entidade independente do estudo de caso
```
(env)$  python manage.py startapp ovino
```
2. Pegar a classe da aplicação (**OvinoConfig**) no arquivo **ovino/apps.py** e aplicar na lista **INSTALLED_APPS** no arquivo **agrovino/settings.py**
3. Elaborar o modelo, criando a classe do modelo no aquivo **ovino/models.py**. [Referencia para tipos de campos](https://docs.djangoproject.com/en/4.1/ref/models/fields/#model-field-types)
```
from django.db import models


class Ovino(models.Model):
    
    identificador = models.CharField(max_length=16, unique=True)
    peso = models.FloatField()
    nascimento = models.DateTimeField()
    raca = models.CharField(max_length=20, null=True)
    cor = models.CharField(max_length=20,blank=True, null=True)
    genero = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.deveui

```
4. Validar o código do projeto
```
(env)$  python manage.py check
```
5. Criar a migração
```
(env)$  python manage.py makemigrations
```
6. Aplicar a migração
```
(env)$  python manage.py migrate
```
7. Elaborar formulários de CRUD, criando a classe do modelo no aquivo **ovino/forms.py**
```
from django import forms
from .models import Ovino


class OvinoForm(forms.ModelForm):

	class Meta:
		model = Ovino

		fields = [
			"identificador",
            "peso",
            "nascimento",
            "raca",
            "cor",
            "genero",
		]

```
8. Validar novamente
```
(env)$  python manage.py check
```
9. Construir as páginas de CRUD
- criar a pasta de templates na aplicação **ovino/templates**
> ovino_index.html
>
> ovino_delete.html
>
> ovino_index.html
>
> ovino_read.html
>
> ovino_update.html
10.  Elaborar os métodos de CRUD no aquivo **ovino/view.py**
```
from django.shortcuts import (get_object_or_404,
                              render,
                              HttpResponseRedirect)
from .models import Ovino
from .forms import OvinoForm
from django.contrib.auth.decorators import login_required


def index(request):
    context = {}
    context["dataset"] = Ovino.objects.all()
    return render(request, "ovino_index.html", context)


def create(request):
    context = {}
    form = OvinoForm(request.POST or None)
    if form.is_valid():
        form.save()
        return HttpResponseRedirect("/")
    context['form'] = form
    return render(request, "ovino_create.html", context)


def read(request, id):
    context = {}
    context["data"] = Ovino.objects.get(id=id)
    return render(request, "ovino_read.html", context)


def update(request, id):
    context = {}
    obj = get_object_or_404(Ovino, id=id)
    form = OvinoForm(request.POST or None, instance=obj)
    if form.is_valid():
        form.save()
        return HttpResponseRedirect("/ovino/" + id + "/read")
    context["form"] = form
    return render(request, "ovino_update.html", context)


def delete(request, id):
    context = {}
    obj = get_object_or_404(Ovino, id=id)
    if request.method == "POST" and obj:
        obj.delete()
        return HttpResponseRedirect("/")
    context["data"] = obj
    return render(request, "ovino_delete.html", context)

```
11. Inserir as rotas dos métodos na aplicação pelo arquivo **ovino/urls.py**
```
from django.urls import path
from . import views

app_name = "ovino"

urlpatterns = [
    path('', views.index, name='index'),
    path('create', views.create, name='create'),
    path('<id>/read', views.read, name='read'),
    path('<id>/update', views.update, name='update'),
    path('<id>/delete', views.delete, name='delete'),
]
```
12. Inserir as rotas da aplicação no projeto pelo arquivo **agrovino/urls.py**
```
from django.contrib import admin
from django.urls import include, path
from ovino import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ovino/', include('ovino.urls')),
    path('', views.index),
]

```
13. Instalar a apicação Sekizai para renderizar as urls nos templates
```
pip install django-sekizai django-widget-tweaks
pip freeze >> requirements.txt
```
14. E aplicar as aplciações **sekizai** e **widget_tweaks** na lista **INSTALLED_APPS**  no arquivo **agrovino/settings.py**

### Restringir acesso com login
1. Criar um usuário de acesso root
```
(env)$  python manage.py createsuperuser
- Username (leave blank to use 'user'): admin
- Email address: admin@unifametro.br
- Password: pass.123
- Password (again): pass.123
Superuser created successfully.
```
2. Aplicar as rotas da aplciação de auth nativa do DJango no arquivo **agrovino/urls.py**
```
from django.contrib import admin
from django.urls import include, path
from ovino import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ovino/', include('ovino.urls')),
    path('', views.index),
]

urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
]

```
3.  Criar o arquivo **templates/registration/login.html** para atualizar o tamplate nativo.
4.  Adicionar o caminho de **./templates** no arquivo **agrovino/settings.py**.
```
import os
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
# Redirect to home URL after login (Default redirects to /accounts/profile/)
LOGIN_REDIRECT_URL = '/ovino/'
LOGOUT_REDIRECT_URL = '/'
```

5. Aplicar a anotação de exigência de login em todos os métodos do arquivo  **ovino/views.py**
```

from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    context = {}
    context["dataset"] = Ovino.objects.all()
    return render(request, "ovino_index.html", context)

```
6. Efetuar commit 
```
(env)$ git add .
(env)$ git commit -m "Finalizando Atividade 3"
```
7. Realizar push de Branch com o SEU NOME
```
(env)$ git push origin HEAD:**<NOME_SOBRENOME>**
```




