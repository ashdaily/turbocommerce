from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from products.models import (
    Product,
    ProductBrand,
    ProductGrandParentCategory,
    ProductParentCategory,
    ProductChildCategory,
    ProductMeasurement,
    ProductSize,
    ProductVariant,
    ProductVariantImage,
    ProductVariantSpecification,
    ProductVariantInventory,
)


class ProductGrandParentCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductGrandParentCategory
        fields = ["id", "category_name", "slug"]


class ProductParentCategorySerializer(ModelSerializer):
    grand_parent_category = ProductGrandParentCategorySerializer()

    class Meta:
        model = ProductParentCategory
        fields = ["id", "category_name", "slug", "grand_parent_category"]


class ProductChildCategorySerializer(ModelSerializer):
    parent_category = ProductParentCategorySerializer()

    class Meta:
        model = ProductChildCategory
        fields = ["id", "category_name", "slug", "parent_category"]


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
    size = ProductSizeSerializer()

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "stock_keeping_unit",
            "size",
            "discount",
            "published",
            "price",
            "weight_in_grams",
            "color",
            "images",
            "quantity",
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
