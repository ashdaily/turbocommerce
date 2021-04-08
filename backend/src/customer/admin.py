from django.contrib import admin

from customer.models import CustomerShippingAddress, CustomerCreditCard


admin.site.register(CustomerShippingAddress)
admin.site.register(CustomerCreditCard)
