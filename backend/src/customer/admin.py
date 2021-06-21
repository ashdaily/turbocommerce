from django.contrib import admin

from customer.models import CustomerShippingAddress, CustomerWishlist


admin.site.register(CustomerWishlist)
admin.site.register(CustomerShippingAddress)
