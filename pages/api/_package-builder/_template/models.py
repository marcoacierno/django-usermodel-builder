from django.db import models
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager


class MemoriesUser(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)

    email = models.EmailField(
        verbose_name=_("email"), max_length=255, db_index=True, blank=False, unique=True
    )

    is_active = models.BooleanField(verbose_name=_("active"), default=True)

    is_staff = models.BooleanField(
        _("staff"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )

    objects = UserManager()

    def __str__(self):
        return f"{self.get_full_name()} {self.email}"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
