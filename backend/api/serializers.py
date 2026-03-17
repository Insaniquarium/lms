from django.contrib.auth import authenticate
from rest_framework import serializers
from api.models import User, Course, Module, Enrolment, ModuleCompletion

class UserSerializer(serializers.ModelSerializer):
	"""
	TODO: An email change should maybe be its own endpoint for security? Most
	services send for verification first. Another endpoint could be done by
	making a detail action in the ViewSet or something.

	(Or do it with this somehow? Maybe communicate it's not done yet by sending
	HTTP 202 Accepted?)

	Some places might also not let you change first/last name without approval
	of staff.
	"""
	date_joined = serializers.DateTimeField(read_only=True)
	last_login = serializers.DateTimeField(read_only=True)	

	class Meta:
		model = User
		fields = ['id', 'email', 'first_name', 'last_name', 'date_joined', 'last_login']

class ModuleSerializer(serializers.ModelSerializer):
	created_at = serializers.DateTimeField(read_only=True)

	class Meta:
		model = Module
		fields = ['id', 'course', 'title', 'description', 'image', 'content_url', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
	created_at = serializers.DateTimeField(read_only=True)
	enrolments = serializers.SerializerMethodField()
	modules = ModuleSerializer(many=True, read_only=True) # make this its own endpoint? maybe 'modules' should just be a count here?

	class Meta:
		model = Course
		fields = ['id', 'title', 'description', 'image', 'created_at', 'public', 'enrolments', 'modules']

	def get_enrolments(self, obj):
		return obj.enrolment_set.count()

class UserModuleSerializer(ModuleSerializer):
	started_at = serializers.DateTimeField(read_only=True)
	completed_at = serializers.DateTimeField(read_only=True)

	class Meta(ModuleSerializer.Meta):
		fields = [*ModuleSerializer.Meta.fields, 'started_at', 'completed_at']

class UserCourseSerializer(CourseSerializer):
	modules = UserModuleSerializer(many=True, read_only=True) # same concern as before on CourseSerializer
	enroled_at = serializers.DateTimeField(read_only=True)

	class Meta(CourseSerializer.Meta):
		fields = [*CourseSerializer.Meta.fields, 'enroled_at']

class UserActivitySerializer(serializers.ModelSerializer):
	# Using IntegerField for this seems a bit of a hack
	course = serializers.IntegerField(source='module.course.id', read_only=True)
	course_title = serializers.CharField(source='module.course.title', read_only=True)
	module_title = serializers.CharField(source='module.title', read_only=True)
	started_at = serializers.DateTimeField(read_only=True)
	completed_at = serializers.DateTimeField(read_only=True)

	class Meta:
		model = ModuleCompletion
		fields = ['course', 'module', 'course_title', 'module_title', 'started_at', 'completed_at']

class AdminCourseSerializer(CourseSerializer):
	pass

# rest_framework's, but adapted to be for email addresses instead of usernames
class AuthTokenSerializer(serializers.Serializer):
	email = serializers.CharField(write_only=True)
	password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False, write_only=True)
	token = serializers.CharField(read_only=True)

	def validate(self, attrs):
		email = attrs.get('email')
		password = attrs.get('password')

		if email and password:
			user = authenticate(request=self.context.get('request'), email=email, password=password)

			if not user:
				msg = 'Unable to log in with provided credentials.'
				raise serializers.ValidationError(msg, code='authorization')
		else:
			msg = 'Must include "email" and "password".'
			raise serializers.ValidationError(msg, code='authorization')

		attrs['user'] = user
		return attrs
