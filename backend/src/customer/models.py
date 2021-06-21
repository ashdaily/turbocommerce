from django.db import models

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
    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="customer_shipping_addresses",
        related_query_name="customer_shipping_address",
    )
    address_street_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_street_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
