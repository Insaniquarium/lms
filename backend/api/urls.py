from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='user')
router.register('users/(?P<user_id>[^/.]+)/courses', views.UserCourseViewSet, basename='user-course')
router.register('users/(?P<user_id>[^/.]+)/activity', views.UserActivityViewSet, basename='user-activity')
router.register('courses', views.CourseViewSet, basename='course')
router.register('courses/(?P<course_id>[^/.]+)/modules', views.ModuleViewSet, basename='module')

urlpatterns = [
	path('', include(router.urls)),
	path('login', views.AuthToken.as_view())
]
