from rest_framework.serializers import ModelSerializer

from products.models import (
    ProductGrandParentCategory,
    ProductParentCategory,
    ProductChildCategory,
)


class ProductChildCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductChildCategory
        fields = ["id", "category_name", "slug"]


class ProductParentCategorySerializer(ModelSerializer):
    product_child_categories = ProductChildCategorySerializer(many=True)

    class Meta:
        model = ProductParentCategory
        fields = ["id", "category_name", "slug", "product_child_categories"]


class ProductGrandParentCategorySerializer(ModelSerializer):
    product_parent_categories = ProductParentCategorySerializer(many=True)

    class Meta:
        model = ProductGrandParentCategory
        fields = ["id", "category_name", "slug", "product_parent_categories"]
