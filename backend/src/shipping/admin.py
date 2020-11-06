from django.contrib import admin

from .models import Shipper, ShippingOrderDetail, ShippingOrder


admin.site.register(Shipper)
admin.site.register(ShippingOrderDetail)
admin.site.register(ShippingOrder)
