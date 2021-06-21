from django.http import Http404
from pyhustler.pagination import PaginationMixin
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from utils.pagination import StandardPagination, ProductSuggestionPagination
from utils.strings import query_params_to_list
from .models import Product, ProductGrandParentCategory, ProductVariantInventory
from products.serializers.product import ProductSerializer
from products.serializers.category import ProductGrandParentCategorySerializer
from products.serializers.product_variant_inventory import (
    ProductVariantInventorySerializer,
)


class ProductListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/
    PATH: /api/products/?slug=
    """

    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.request.query_params.get("slug", None)
        if slug is None:
            # T0DO: send only variant that are published
            return Product.objects.filter()
        return (
            Product.objects.prefetch_related("product_variants")
            .select_related("brand", "child_category")
            .filter(slug=slug)
        )


class ProductDetailsView(APIView):
    """
    PATH: /api/products/<id>/
    """

    model = Product
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer = ProductSerializer

    def get_object(self, pk):
        try:
            return (
                self.model.objects.prefetch_related("product_variants")
                .select_related("brand", "child_category")
                .get(pk=pk)
            )
        except self.model.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        o = self.get_object(pk)
        serializer = self.serializer(o)
        return Response(serializer.data)


class ProductsByIdsListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/in-ids/?id=
    """

    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        id_string = self.request.query_params.get("id", None)
        try:
            ids = query_params_to_list(id_string)
        except ValueError:
            return Product.objects.none()
        else:
            return (
                Product.objects.prefetch_related("product_variants")
                .select_related("brand", "child_category")
                .filter(id__in=ids)
            )


class ProductSuggestionListView(APIView, PaginationMixin):
    """
    PATH: /api/products/product-suggestion/<product_id>/
    """

    pagination_class = ProductSuggestionPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer = ProductSerializer

    def get(self, request, product_id, format=None):
        queryset = (
            Product.objects.prefetch_related("product_variants")
            .select_related("brand", "child_category")
            .product_suggestion(last_seen_product_id=product_id)
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serialized = self.serializer(page, many=True)
            return self.get_paginated_response(serialized.data)
        return Response(self.serializer.errors)


class ProductCategoriesListView(APIView):
    """
    PATH: /api/products/categories/
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = (
            ProductGrandParentCategory.objects.prefetch_related(
                "product_parent_categories"
            )
            .all()
            .order_by("id")
        )
        serializer = ProductGrandParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)


class ProductByCategoryListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/by-category/?grand_parent_category_slug=&parent_category_slug=&child_category_slug=/
    """

    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        grand_parent_category_slug = self.request.query_params.get(
            "grand_parent_category_slug", None
        )
        parent_category_slug = self.request.query_params.get(
            "parent_category_slug", None
        )
        child_category_slug = self.request.query_params.get("child_category_slug", None)

        queryset = Product.objects.get_product_by_category(
            grand_parent_category_slug, parent_category_slug, child_category_slug
        )

        return queryset


class ProductVariantInventoryListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/variant-inventory/in-ids/?product_variant_ids=
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ProductVariantInventorySerializer

    def get_queryset(self):
        id_string = self.request.query_params.get("product_variant_ids", None)
        try:
            product_variant_ids = query_params_to_list(id_string)
        except ValueError:
            return ProductVariantInventory.objects.none()
        else:
            return ProductVariantInventory.objects.filter(
                product_variant_id__in=product_variant_ids
            )
