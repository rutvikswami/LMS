from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from django.utils import timezone
# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model.
    Roles are NOT stored here.
    Authorization is handled via Groups & Permissions.
    """

    email = models.EmailField(unique=True)
    user_name = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_name"]

    def __str__(self):
        return self.email
