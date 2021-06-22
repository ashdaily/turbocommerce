from django.core.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer

from customer.models import CustomerWishlist, CustomerShippingAddress


class CustomerWishlistSerializer(ModelSerializer):
    class Meta:
        model = CustomerWishlist
        fields = ["id", "customer", "product"]
        write_only = ["customer"]

    def validate_customer(self, customer):
        if not customer.is_customer:
            raise ValidationError("Only customers can add a wishlist")
        return customer


class CustomerShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = CustomerShippingAddress
        write_only = ["customer"]
        fields = [
            "id",
            "customer",
            "address",
            "city",
            "province",
            "country",
            "postal_code",
            "country_code_primary_phone_number",
            "primary_phone_number",
            "country_code_alternate_phone_number",
            "alternate_phone_number",
            "address_type",
            "default_address",
        ]
