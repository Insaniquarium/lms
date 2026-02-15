from api.permissions import IsOurUser
from . import models
from . import serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

class AuthToken(ObtainAuthToken):
	serializer_class = serializers.AuthTokenSerializer

	# Also inherits a coreapi_schema containing remaining username references, but we're not using that

	# No way of token expiry however
	def post(self, request, *args, **kwargs): # pyright: ignore
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user'] # pyright: ignore
		token, created = Token.objects.get_or_create(user=user)
		return Response({
			'token': token.key,
			'user_id': user.pk
		})

class UserViewSet(ModelViewSet):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer

	def get_permissions(self): # pyright: ignore
		if self.action == 'retrieve':
			permission_classes = [IsOurUser | IsAdminUser]
		else:
			permission_classes = [IsAdminUser]
		return [permission() for permission in permission_classes]

	# @action(detail=False, methods=['get'])
	# def me(self, request):
	# 	pass

class CourseViewSet(ModelViewSet):
	queryset = models.Course.objects.all()
	serializer_class = serializers.CourseSerializer
	lookup_url_kwarg = 'course_id'

	#def get_permissions(self): # pyright: ignore
	#	pass #IsAuthenticated

class ModuleViewSet(ModelViewSet):
	queryset = models.Module.objects.all()
	serializer_class = serializers.ModuleSerializer
	lookup_url_kwarg = 'module_id'

	# def get_permissions(self):
	#	pass

	def get_queryset(self): # pyright: ignore
		return self.queryset.filter(course_id=self.kwargs['course_id'])

	def perform_create(self, serializer):
		serializer.save(course_id=self.kwargs['course_id'])
