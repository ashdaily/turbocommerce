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
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    address_street_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_street_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)


class CustomerCreditCard(Timestamp):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    credit_card_number = models.CharField(max_length=16, null=True, blank=True)
    credit_card_valid_from = models.CharField(max_length=7, null=True, blank=True)
    credit_card_valid_until = models.CharField(max_length=7, null=True, blank=True)
    credit_card_type = models.CharField(max_length=16, null=True, blank=True)
