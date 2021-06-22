from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from products.models import Product
from core.models import Timestamp, User


class CustomerWishlist(Timestamp):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.customer.email}"

    class Meta:
        unique_together = [["customer", "product"]]


class CustomerShippingAddress(Timestamp):
    ADDRESS_TYPE_HOME = "HOME"
    ADDRESS_TYPE_OFFICE = "OFFICE"

    ADDRESS_TYPE_CHOICES = (
        (ADDRESS_TYPE_HOME, ADDRESS_TYPE_HOME),
        (ADDRESS_TYPE_OFFICE, ADDRESS_TYPE_OFFICE),
    )

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="customer_shipping_addresses",
        related_query_name="customer_shipping_address",
    )
    customer_name = models.CharField(max_length=200)
    address = models.TextField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    country_code_primary_phone_number = models.CharField(max_length=5)
    primary_phone_number = models.CharField(max_length=20)
    country_code_alternate_phone_number = models.CharField(max_length=5)
    alternate_phone_number = models.CharField(max_length=20, null=True, blank=True)
    address_type = models.CharField(choices=ADDRESS_TYPE_CHOICES, max_length=20)
    default_address = models.BooleanField(default=True)
