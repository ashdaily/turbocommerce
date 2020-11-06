from django.db import models

from core.models import Timestamp, Customer
from products.models import Product, ProductSize


class Shipper(Timestamp):
    company_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)


class ShippingOrderDetail(Timestamp):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True)


class ShippingOrder(Timestamp):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    shipping_order_details = models.ForeignKey(
        ShippingOrderDetail, on_delete=models.CASCADE
    )
    shipper = models.ForeignKey(Shipper, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=255, null=True, blank=True)
    order_datetime = models.DateTimeField(auto_now_add=True)
    shipping_datetime = models.DateTimeField(auto_now_add=True)
