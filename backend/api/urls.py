from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('courses', views.CourseViewSet)
router.register('courses/(?P<course_id>[^/.]+)/modules', views.ModuleViewSet)

urlpatterns = [
	path('', include(router.urls)),
	path('login', views.AuthToken.as_view())
]
