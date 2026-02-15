from rest_framework.permissions import BasePermission

# Probably not the best way
class IsOurUser(BasePermission):
	def has_object_permission(self, request, view, obj):
		return request.user == obj
