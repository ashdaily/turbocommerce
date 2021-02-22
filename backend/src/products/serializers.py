from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import (
    Product,
    ProductBrand,
    ProductGrandParentCategory,
    ProductMeasurement,
    ProductSize,
    ProductVariant,
    ProductVariantSpecification,
)


class ProductBrandSerializer(ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ("id", "brand_name", "slug")


class ProductMeasurementSerializer(ModelSerializer):
    class Meta:
        model = ProductMeasurement
        fields = "__all__"


class ProductSizeSerializer(ModelSerializer):
    measurement = ProductMeasurementSerializer(many=True)

    class Meta:
        model = ProductSize
        exclude = ("user",)


class ProductVariantSpecificationSerializer(ModelSerializer):
    class Meta:
        model = ProductVariantSpecification
        fields = ("specification_name", "specification_value")


class ProductVariantSerializer(ModelSerializer):
    class Meta:
        model = ProductVariant


class ProductSerializer(ModelSerializer):
    brand = ProductBrandSerializer()
    product_specification = ProductVariantSpecificationSerializer(
        many=True, read_only=True
    )
    sizes_available = ProductSizeSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "child_category",
            "brand",
            "product_name",
            "product_description",
            "quantity_per_unit",
            "slug",
            "sizes_available",
            "unit_price",
            "discount",
            "unit_weight_in_grams",
            "returnable",
            "country_of_origin",
            "product_specification",
        ]


class ProductGrandParentCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductGrandParentCategory
        fields = "__all__"
        depth = 1
