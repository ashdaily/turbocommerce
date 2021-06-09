from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from products.models import ProductVariantInventory


class ProductVariantInventorySerializer(ModelSerializer):
    in_stock = serializers.BooleanField()

    class Meta:
        model = ProductVariantInventory
        fields = ["product_variant", "in_stock"]
        read_only_fields = ["in_stock"]
