from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	pass
	# USERNAME_FIELD = 'email'
	# REQUIRED_FIELDS = ["first_name", "last_name"]
	# email = models.EmailField(unique=True)
	# is_staff = None
	# is_superuser = None

class Course(models.Model):
	title = models.CharField(max_length=128)
	description = models.TextField()
	image = models.ImageField(upload_to='courses/')
	created_at = models.DateTimeField(auto_now_add=True)
	public = models.BooleanField(default=False)
	enrolments = models.ManyToManyField(User, through='Enrolment')

	def __str__(self):
		return f"{self.title} ({self.pk})"

class Module(models.Model):
	course = models.ForeignKey(Course, related_name='modules', on_delete=models.CASCADE)
	title = models.CharField(max_length=128)
	description = models.TextField()
	image = models.ImageField(upload_to='modules/')
	content_url = models.URLField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.title} ({self.pk})"

class Enrolment(models.Model):
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	enroled_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		constraints = [
			# A user can only be enroled into a course once
			models.UniqueConstraint(fields=['user', 'course'], name='unique_user_course_enrolment')
		]

class ModuleCompletion(models.Model):
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	module = models.ForeignKey(Module, on_delete=models.CASCADE)
	started_at = models.DateTimeField()
	completed_at = models.DateTimeField(null=True, blank=True)

	class Meta:
		constraints = [
			# A lesson can only be started/completed once
			models.UniqueConstraint(fields=['user', 'module'], name='unique_user_module_completion')
		]
