from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from . import models
from . import serializers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
	queryset = models.User.objects.all()
	serializer_class = serializers.UserSerializer
	# permission_classes
	# def get_permissions(self):
	#	pass

	# @action(detail=False, methods=['get'])
	# def me(self, request):
	# 	pass

class CourseViewSet(viewsets.ModelViewSet):
	queryset = models.Course.objects.all()
	serializer_class = serializers.CourseSerializer
	lookup_url_kwarg = 'course_id'

	# def get_permissions(self):
	#	pass

# /courses/:id/modules/:id
class ModuleViewSet(viewsets.ModelViewSet):
	queryset = models.Module.objects.all()
	serializer_class = serializers.ModuleSerializer
	lookup_url_kwarg = 'module_id'

	# def get_permissions(self):
	#	pass

	def get_queryset(self): # pyright: ignore
		return self.queryset.filter(course_id=self.kwargs['course_id'])

	def perform_create(self, serializer):
		serializer.save(course_id=self.kwargs['course_id'])
