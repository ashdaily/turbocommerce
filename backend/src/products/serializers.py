from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import (
    ProductChildCategory,
    Product,
    ProductBrand,
    ProductGrandParentCategory,
    ProductMeasurement,
    ProductSize,
    ProductVariant,
    ProductVariantImage,
    ProductVariantSpecification,
    ProductVariantInventory,
)


class ProductChildCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductChildCategory
        fields = ["parent_category", "category_name", "slug"]


class ProductBrandSerializer(ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ["id", "brand_name", "slug"]


class ProductMeasurementSerializer(ModelSerializer):
    class Meta:
        model = ProductMeasurement
        fields = "__all__"


class ProductSizeSerializer(ModelSerializer):
    measurement = ProductMeasurementSerializer(many=True)

    class Meta:
        model = ProductSize
        fields = ["name", "measurement", "comment"]


class ProductVariantImageSerializer(ModelSerializer):
    class Meta:
        model = ProductVariantImage
        fields = ["image", "published"]


class ProductVariantSpecificationSerializer(ModelSerializer):
    class Meta:
        model = ProductVariantSpecification
        fields = ["specification_name", "specification_value"]


class ProductVariantSerializer(ModelSerializer):
    images = serializers.ListField()
    product_variant_specifications = ProductVariantSpecificationSerializer(many=True)
    in_stock = serializers.BooleanField()
    sizes_available = ProductSizeSerializer(many=True)

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "stock_keeping_unit",
            "sizes_available",
            "discount",
            "published",
            "price",
            "weight_in_grams",
            "color",
            "images",
            "product_variant_specifications",
            "in_stock",
        ]
        read_only_fields = ["in_stock"]


class ProductSerializer(ModelSerializer):
    brand = ProductBrandSerializer()
    child_category = ProductChildCategorySerializer()
    product_variants = ProductVariantSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "child_category",
            "brand",
            "product_name",
            "product_description",
            "product_variants",
            "slug",
            "returnable",
            "country_of_origin",
        ]


class ProductGrandParentCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductGrandParentCategory
        fields = "__all__"
        depth = 1
