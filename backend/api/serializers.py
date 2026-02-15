from django.contrib.auth import authenticate
from rest_framework import serializers
from api.models import User, Course, Module, Enrolment, ModuleCompletion

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'email', 'first_name', 'last_name', 'date_joined', 'last_login']

class ModuleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Module
		fields = ['id', 'course', 'title', 'description', 'image', 'content_url', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
	modules = ModuleSerializer(many=True, read_only=True)

	class Meta:
		model = Course
		fields = ['id', 'title', 'description', 'image', 'created_at', 'public', 'modules']

class EnrolmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Enrolment
		fields = ['user', 'course', 'enroled_at']

class ModuleCompletionSerializer(serializers.ModelSerializer):
	class Meta:
		model = ModuleCompletion
		fields = ['user', 'module', 'started_at', 'completed_at']

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
