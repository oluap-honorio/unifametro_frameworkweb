from django.urls import include, path
from . import views

app_name = "ovino"

urlpatterns = [
    path('', views.index, name='index'),
    path('create', views.create, name='create'),
    path('<id>', views.show, name='show'),
    path('<id>/update', views.update, name='update'),
    path('<id>/delete', views.delete, name='delete'),
]

