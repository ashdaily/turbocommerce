from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify


class Timestamp(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = "created"
        ordering = ("-created",)


class User(AbstractUser):
    CUSTOMER = "CUSTOMER"
    ADMIN = "ADMIN"
    USER_TYPES = ((CUSTOMER, CUSTOMER), (ADMIN, ADMIN))

    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address_pincode = models.IntegerField(null=True, blank=True)

    @property
    def is_customer(self):
        if self.user_type == self.CUSTOMER:
            return True
        return False

    @property
    def is_admin(self):
        if self.user_type == self.ADMIN:
            return True
        return False
