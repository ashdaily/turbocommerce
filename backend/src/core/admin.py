from django.contrib import admin

from .models import Customer, Vendor, CustomerShippingAddress, CustomerCreditCard


admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(CustomerShippingAddress)
admin.site.register(CustomerCreditCard)
