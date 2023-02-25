|  [Home](/README.md)  |  [Atividade 1](/doc/atv1.md)

*  Nesta página está descrito os passos para configurar o ambiente Django.

## Configurando Django
Para desenvolver com o framework Django será necessário prover um ambiente virtual Python3 para isolar as demais dependencias do sistema operacional.

### Primeiramente
1. Abra o terminal de comando.
```
cmd
```
2. Efetuar fork do repositorio [https://github.com/oluap-honorio/unifametro_frameworkweb](https://github.com/oluap-honorio/unifametro_frameworkweb)
- Clonar o repositorio apos o fork
```
$ git clone https://github.com/<SEU LOGIN>/unifametro_frameworkweb.git
$ cd unifametro_frameworkweb
```
3. Gerar uma Branch com o seu nome.
```
$ git checkout -b NOME_SOBRENOME
$ git branch
```

### Siga os seguintes paços:
1. Gere o ambiente inicial:
```
$ python -m venv env
```
2. Ativar o Ambiente virtual:
```
$ env\Scripts\activate
```
3. Efetuar instalação do Django
```
(env)$ pip install django
```
4. Validar instalação
```
(env)$ python
>>> import django
>>> print(django.get_version())
Ctrl + z
<Enter>
```
5. Gerar lista requerimentos
```
(env)$ pip freeze > requirements.txt
```
6. Efetuar commit da lista de requerimentos
```
(env)$ git add requirements.txt
(env)$ git commit -m "Finalizando Atividade 1"
```
7. Realizar push de Branch com o SEU NOME
```
(env)$ git push origin HEAD:NOME_SOBRENOME
```
