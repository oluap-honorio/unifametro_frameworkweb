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