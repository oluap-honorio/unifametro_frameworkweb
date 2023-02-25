|  [Home](/README.md)  |  [Atividade 5](/doc/atv5.md)

*  Nesta página está descrito os passos para prover um push mensagem de alerta no projeto com um template Bootstrap HTML

### Configurar estrutura template Django:
1. Ativar novamente o Ambiente Virtual e cadastrar usuário admin:
```
$ env\Scripts\activate
$ python manage.py createsuperuser --email admin@unifametro.br --username admin
```
2. Criar uma arquivo base.html na pasta templates na raiz do projeto, com a o seguinte script:
```
<!DOCTYPE html>
    {% load sekizai_tags %}
    {% load static %}
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8" />
        <title>{% block "title" %} AGROVINOS {% endblock %}</title>
        <link rel="shortcut icon" href="{% static 'favicon_io/favicon.ico' %}" />
        {% block styles %}{% endblock %}
    </head>
    <!-- END HEAD -->

    <body>
        <!-- BEGIN CONTAINER -->
        <div>
                <!-- BEGIN PAGE BASE CONTENT -->
                {% block "conteudo" %} {% endblock %}
                <!-- END PAGE BASE CONTENT -->
        </div>
        {% block scripts %}{% endblock %}
    </body>
</html>
```
3. Alterar um dos tamplates da aplicação ovino, para herdar o base.html. Ex.: ./onivo/templates/ovini_create.html
```
{% extends "base.html" %}

{% load sekizai_tags %}
{% load widget_tweaks %}

{% block "title" %}Cadastrar Ovino{% endblock %}
{% block "conteudo" %}
    <form method="POST" enctype="multipart/form-data">
		...
	</form>
{% endblock %}
```


### Configurar arquivos estáticos:
1. Criar a pasta static na pasta agrovinos
2. Adicionar um favicon.ico ou uma imagem de teste na pasta static
3. Adicinar as variáveis STATIC_ROOT e STATICFILES_DIRS abaixo da STATIC_URL no agrovinos\settings.py
```
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'agrovinos/static'),
)
```
1. Inicia o servidor e valida o favicon.ico e o titulo do tamplate alterado.
```
$ python manage.py runserver
```

### Configuração de dependencias CSS, JavaScript e Imagens:
1. Mover as dependencias do template Bootstrap para pasta static
2. Aplicar algum gerenciador de pacotes npm para auxiliar na instalação das dependências. Yarn, gulp, bower, etc.

### Aplicar templete Bootstrap:
1. Atualizar referências das dependencias nos templates HTML
```
<link rel="stylesheet" href="{% static 'styles/bootstrap.css' %}">
<!-- Proton CSS: -->
<link rel="stylesheet" href="{% static 'styles/proton.css' %}">
<link rel="stylesheet" href="{% static 'styles/vendor/animate.css' %}">
<!-- adds CSS media query support to IE8   -->
<!-- Fonts CSS: -->
<link rel="stylesheet" href="{% static 'styles/font-awesome.css' %}" type="text/css" />
<link rel="stylesheet" href="{% static 'styles/font-titillium.css' %}" type="text/css" />
``` 
2. Alterando o base.html para páginal com o tamplate escolhido

3. Aplciando um formuláriode cadastro de ovino

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