from django.contrib import admin

from .models import CustomerShippingAddress, CustomerCreditCard

from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
admin.site.register(CustomerShippingAddress)
admin.site.register(CustomerCreditCard)
