from rest_framework.serializers import ModelSerializer
from .models import Product, ProductGrandParentCategory


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        exclude = ("user",)
        depth = 1


class ProductGrandParentCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductGrandParentCategory
        fields = "__all__"
        depth = 1
