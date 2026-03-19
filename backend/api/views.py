from . import permissions
from . import models
from . import serializers
from django.db.models import OuterRef, Prefetch, Subquery, F, prefetch_related_objects
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.generics import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

class AuthToken(ObtainAuthToken):
	serializer_class = serializers.AuthTokenSerializer

	# Also inherits a coreapi_schema containing remaining username references, but we're not using that

	# No way of token expiry however
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user'] # pyright: ignore
		token, created = Token.objects.get_or_create(user=user)
		return Response({
			'token': token.key
		})

class UserViewSet(ModelViewSet):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer

	def get_permissions(self):
		if self.action in {'retrieve', 'update', 'partial_update'}:
			permission_classes = [permissions.IsOurUser | IsAdminUser]
		elif self.action == 'me':
			permission_classes = [IsAuthenticated]
		else:
			permission_classes = [IsAdminUser]
		return [permission() for permission in permission_classes]

	@action(detail=False, methods=['get'])
	def me(self, request):
		return Response(serializers.UserSerializer(request.user).data)

class UserCourseViewSet(ReadOnlyModelViewSet):
	permission_classes = [permissions.IsOurUserFromURL | IsAdminUser]

	def get_queryset(self): # pyright: ignore
		get_object_or_404(models.User, pk=self.kwargs['user_id'])

		return models.Course.objects.filter(enrolment__user_id=self.kwargs['user_id']) \
		       .annotate(enroled_at=F('enrolment__enroled_at')) \
		       .distinct()

	"""
	Doing the annotation here possibly makes this more efficient, as get_object
	is only called when retrieving a specific object, instead of when listing
	all of them.
	"""
	def get_object(self):
		obj = super().get_object()

		completions = models.ModuleCompletion.objects.filter(
			module=OuterRef('pk'), user_id=self.kwargs['user_id']
		)

		"""
		We don't *need* the [:1]s as there should only be one at max anyway
		because of the constraints, but I suppose it's more defensive
		"""
		modules_with_completion = obj.modules.annotate(
			started_at=Subquery(completions.values('started_at')[:1]),
			completed_at=Subquery(completions.values('completed_at')[:1])
		)

		prefetch_related_objects([obj], Prefetch('modules', queryset=modules_with_completion))
		return obj

	def get_serializer_class(self):
		if self.action == 'retrieve':
			return serializers.UserCourseDetailSerializer
		else:
			return serializers.UserCourseSerializer

class UserActivityViewSet(ReadOnlyModelViewSet):
	permission_classes = [permissions.IsOurUserFromURL | IsAdminUser]
	serializer_class = serializers.UserActivitySerializer

	# Should somehow have an option to limit (so a dashboard only listing 4 doesn't fetch all, efficiency)
	def get_queryset(self): # pyright: ignore
		get_object_or_404(models.User, pk=self.kwargs['user_id'])
		return models.ModuleCompletion.objects.filter(user_id=self.kwargs['user_id']).order_by('completed_at')

class CourseViewSet(ModelViewSet):
	lookup_url_kwarg = 'course_id'

	def get_permissions(self):
		if self.action in {'list', 'retrieve'}:
			return [IsAuthenticated()]
		else:
			return [IsAdminUser()]

	def get_queryset(self): # pyright: ignore
		if self.request.user.is_staff:
			return models.Course.objects.all()
		else:
			return models.Course.objects.filter(public=True) # and the private ones the user is enrolled in?

	def get_serializer_class(self):
		if self.action == 'retrieve':
			return serializers.CourseDetailSerializer
		else:
			return serializers.CourseSerializer

class CourseModuleViewSet(ModelViewSet):
	serializer_class = serializers.ModuleSerializer
	lookup_url_kwarg = 'module_id'

	def get_permissions(self):
		if self.action in {'list', 'retrieve'}:
			return [IsAuthenticated()]
		else:
			return [IsAdminUser()]

	def get_queryset(self): # pyright: ignore
		get_object_or_404(models.Course, pk=self.kwargs['course_id'])
		return models.Module.objects.filter(course_id=self.kwargs['course_id'])

	def perform_create(self, serializer):
		serializer.save(course_id=self.kwargs['course_id'])

# Should be the way a user is enrolled on a course?
class CourseEnrolmentViewSet(ModelViewSet):
	pass
