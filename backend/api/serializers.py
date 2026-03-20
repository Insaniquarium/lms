from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from api.models import User, Course, Module, Enrolment, ModuleCompletion

# Could be better. Django has validation right? This should integrate with that.
class PasswordField(serializers.CharField):
	def to_internal_value(self, data):
		value = super().to_internal_value(data)
		return make_password(value)

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
	password = PasswordField(write_only=True) # TODO: Changing password should need approval
	date_joined = serializers.DateTimeField(read_only=True)
	last_login = serializers.DateTimeField(read_only=True)	

	class Meta:
		model = User
		fields = ['id', 'email', 'first_name', 'last_name', 'password', 'date_joined', 'last_login']

class ModuleSerializer(serializers.ModelSerializer):
	created_at = serializers.DateTimeField(read_only=True)

	class Meta:
		model = Module
		fields = ['id', 'title', 'description', 'image', 'content_url', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
	created_at = serializers.DateTimeField(read_only=True)
	modules = serializers.IntegerField(source='modules.count', read_only=True)
	enrolments = serializers.IntegerField(source='enrolments.count', read_only=True)

	class Meta:
		model = Course
		fields = ['id', 'title', 'description', 'image', 'created_at', 'public', 'modules', 'enrolments']

class CourseDetailSerializer(CourseSerializer):
	modules = ModuleSerializer(many=True, read_only=True)

class UserModuleSerializer(ModuleSerializer):
	started_at = serializers.DateTimeField(read_only=True)
	completed_at = serializers.DateTimeField(read_only=True)

	class Meta(ModuleSerializer.Meta):
		fields = [*ModuleSerializer.Meta.fields, 'started_at', 'completed_at']

class UserCourseSerializer(CourseSerializer):
	enroled_at = serializers.DateTimeField(read_only=True)
	progress = serializers.ReadOnlyField(default=25) # TODO: Actually calculate this

	class Meta(CourseSerializer.Meta):
		fields = [*CourseSerializer.Meta.fields, 'enroled_at', 'progress']

class UserCourseDetailSerializer(UserCourseSerializer):
	modules = UserModuleSerializer(many=True, read_only=True)

class UserActivitySerializer(serializers.ModelSerializer):
	course = serializers.PrimaryKeyRelatedField(source='module.course.id', read_only=True)
	course_title = serializers.CharField(source='module.course.title', read_only=True)
	module_title = serializers.CharField(source='module.title', read_only=True)
	started_at = serializers.DateTimeField(read_only=True)
	completed_at = serializers.DateTimeField(read_only=True)

	class Meta:
		model = ModuleCompletion
		fields = ['course', 'module', 'course_title', 'module_title', 'started_at', 'completed_at']

class EnrolmentSerializer(serializers.ModelSerializer):
	# TODO: I don't think this is approached well
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
	# TODO: The result of a POST shows course as a string, but subsequent responses are numeric?

	class Meta:
		model = Enrolment
		fields = ['user', 'course', 'enroled_at']
		read_only_fields = ['course', 'enroled_at']

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
