from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager as AuthUserManager

# Needed otherwise create_superuser fails
class UserManager(AuthUserManager):
	def _create_user_object(self, email, password, **extra_fields):
		if not email:
			raise ValueError('The given email address must be set')

		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.password = make_password(password)
		return user

	def _create_user(self, email, password, **extra_fields):
		user = self._create_user_object(email, password, **extra_fields)
		user.save(using=self._db)
		return user

	async def _acreate_user(self, email, password, **extra_fields):
		user = self._create_user_object(email, password, **extra_fields)
		await user.asave(using=self._db)
		return user

	def create_user(self, email, password=None, **extra_fields): # pyright: ignore
		extra_fields.setdefault('is_staff', False)
		extra_fields.setdefault('is_superuser', False)
		return self._create_user(email, password, **extra_fields)

	async def acreate_user(self, email, password=None, **extra_fields): # pyright: ignore
		extra_fields.setdefault('is_staff', False)
		extra_fields.setdefault('is_superuser', False)
		return await self._acreate_user(email, password, **extra_fields)

	def create_superuser(self, email, password=None, **extra_fields): # pyright: ignore
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)

		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')

		return self._create_user(email, password, **extra_fields)

	async def acreate_superuser(self, email, password=None, **extra_fields): # pyright: ignore
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)

		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')

		return await self._acreate_user(email, password, **extra_fields)

class User(AbstractUser):
	objects = UserManager()
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']
	email = models.EmailField(unique=True)

class Course(models.Model):
	title = models.CharField(max_length=128)
	description = models.TextField()
	image = models.ImageField(upload_to='courses/')
	created_at = models.DateTimeField(auto_now_add=True)
	public = models.BooleanField(default=False)
	enrolments = models.ManyToManyField(User, through='Enrolment')

	def __str__(self):
		return f'{self.title} ({self.pk})'

class Module(models.Model):
	course = models.ForeignKey(Course, related_name='modules', on_delete=models.CASCADE)
	title = models.CharField(max_length=128)
	description = models.TextField()
	image = models.ImageField(upload_to='modules/')
	content_url = models.URLField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f'{self.title} ({self.pk})'

class Enrolment(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	enroled_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		constraints = [
			# A user can only be enroled into a course once
			models.UniqueConstraint(fields=['user', 'course'], name='unique_user_course_enrolment')
		]

class ModuleCompletion(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	module = models.ForeignKey(Module, on_delete=models.CASCADE)
	started_at = models.DateTimeField()
	completed_at = models.DateTimeField(null=True, blank=True)

	class Meta:
		constraints = [
			# A lesson can only be started/completed once
			models.UniqueConstraint(fields=['user', 'module'], name='unique_user_module_completion')
		]
