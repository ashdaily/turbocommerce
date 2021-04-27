from django.contrib import admin

from customer.models import (
    CustomerShippingAddress,
    CustomerCreditCard,
    CustomerWishlist,
)


admin.site.register(CustomerWishlist)
admin.site.register(CustomerShippingAddress)
admin.site.register(CustomerCreditCard)
