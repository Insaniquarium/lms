from rest_framework.permissions import BasePermission

# Probably not the best way
class IsOurUser(BasePermission):
	def has_object_permission(self, request, view, obj):
		return request.user == obj

class IsOurUserFromURL(BasePermission):
	def has_permission(self, request, view): # pyright: ignore
		user_id = view.kwargs.get('user_id')
		return str(request.user.id) == str(user_id)
