from rest_framework.routers import DefaultRouter
from .views import TagViewSet


app_name = 'tag'

router = DefaultRouter(trailing_slash=False)
router.register(r'tag', TagViewSet)

urlpatterns = router.urls

urlpatterns += [
  path('tag/v1/', include('tag.urls', namespace='tag')),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]