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
    VENDOR = "VENDOR"
    USER_TYPES = ((CUSTOMER, CUSTOMER), (VENDOR, VENDOR))

    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address_pincode = models.IntegerField(null=True, blank=True)


class CustomerShippingAddress(Timestamp):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_street_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_street_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)


class CustomerCreditCard(Timestamp):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    credit_card_number = models.CharField(max_length=16, null=True, blank=True)
    credit_card_valid_from = models.CharField(max_length=7, null=True, blank=True)
    credit_card_valid_until = models.CharField(max_length=7, null=True, blank=True)
    credit_card_type = models.CharField(max_length=16, null=True, blank=True)
