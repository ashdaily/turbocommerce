from rest_framework.serializers import ModelSerializer
from .models import Product, ProductGrandParentCategory, ProductMeasurement, ProductSize


class ProductMeasurementSerializer(ModelSerializer):
    class Meta:
        model = ProductMeasurement
        fields = "__all__"


class ProductSizeSerializer(ModelSerializer):
    measurement = ProductMeasurementSerializer(many=True)

    class Meta:
        model = ProductSize
        exclude = ("user",)


class ProductSerializer(ModelSerializer):
    sizes_available = ProductSizeSerializer(many=True)

    class Meta:
        model = Product
        exclude = ("user",)


class ProductGrandParentCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductGrandParentCategory
        fields = "__all__"
        depth = 1
