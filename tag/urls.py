from rest_framework.routers import DefaultRouter
from .views import TagViewSet


app_name = 'tag'

router = DefaultRouter(trailing_slash=False)
router.register(r'tag', TagViewSet)

urlpatterns = router.urls
