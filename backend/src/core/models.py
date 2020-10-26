from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify


class Timestamp(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Customer(User, Timestamp):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    # slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)
    address_pincode = models.IntegerField(null=True)
   

    class Meta:
        verbose_name_plural = "Customers"

    def __str__(self):
        return f'{self.first_name}'

    # def save(self, *args, **kwargs):
    #     # if id exists it means this is update request
    #     if self.pk is None:
    #         self.slug = slugify(self.name)
    #     else:
    #         old_slug = Customer.objects.get(pk=self.pk).slug
    #         new_slug = slugify(self.name)
    #         if old_slug != new_slug:
    #             self.slug = new_slug
    #     super().save(*args, **kwargs)


class ShippingAddress(Timestamp):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    address_street_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_street_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)


class CreditCard(Timestamp):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    credit_card_number = models.CharField(max_length=16, null=True, blank=True)
    credit_card_valid_from = models.CharField(max_length=7, null=True, blank=True)
    credit_card_valid_until = models.CharField(max_length=7, null=True, blank=True)
    credit_card_type = models.CharField(max_length=16, null=True, blank=True)


class Shipper(Timestamp):
    company_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)


class Vendor(Timestamp):
    company_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    

class Category(Timestamp):
    name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.CharField(max_length=550, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(Timestamp):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)


class ShippingOrderDetails(Timestamp):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True)
    size = models.CharField(max_length=20, null=True)


class ShippingOrder(Timestamp):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    shipping_order_details = models.ForeignKey(ShippingOrderDetails, on_delete=models.CASCADE) 
    shipper = models.ForeignKey(Shipper,  on_delete=models.CASCADE) 
    payment_id = models.CharField(max_length=255, null=True, blank=True)
    order_datetime = models.DateTimeField(auto_now_add=True)
    shipping_datetime = models.DateTimeField(auto_now_add=True)

    



