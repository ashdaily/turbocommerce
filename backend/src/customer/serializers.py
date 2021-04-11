from django.core.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from customer.models import CustomerWishlist


class CustomerWishlistSerializer(ModelSerializer):
    class Meta:
        model = CustomerWishlist
        fields = ["customer", "products"]

    def validate_customer(self, customer):
        if not customer.is_customer:
            raise ValidationError("Only customers can add a wishlist")
        return customer
