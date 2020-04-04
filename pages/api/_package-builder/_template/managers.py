from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            **extra_fields
        )

    def create_user(self, email, password, **extra_fields):
        is_staff = extra_fields.pop("is_staff", False)
        return self._create_user(
            email=email,
            password=password,
            is_staff=is_staff,
            is_superuser=False,
            **extra_fields
        )

    def _create_user(self, password, is_staff, is_superuser, **extra_fields):
        email = extra_fields.pop("email")
        email = self.normalize_email(email)

        user = self.model(
            email=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

