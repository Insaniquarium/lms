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
