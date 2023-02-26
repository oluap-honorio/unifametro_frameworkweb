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

urlpatterns += [
  path('tag/v1/', include('tag.urls', namespace='tag')),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
