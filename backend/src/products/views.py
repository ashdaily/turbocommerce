from django.http import Http404
from pyhustler.pagination import PaginationMixin
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from utils.pagination import StandardPagination, ProductSuggestionPagination
from utils.strings import query_params_to_list
from .models import (
    Product,
    ProductGrandParentCategory,
    ProductChildCategory,
    ProductVariant,
)
from .serializers import (
    ProductSerializer,
    ProductGrandParentCategorySerializer,
    ProductChildCategorySerializer,
)


class ProductListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/
    """

    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Product.objects.all()  # T0DO: send only variant that are published
    serializer_class = ProductSerializer


class ProductDetailsView(APIView):
    """
    PATH: /api/products/<id>/
    """

    model = Product
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer = ProductSerializer

    def get_object(self, pk):
        try:
            return self.model.objects.get(pk=pk)
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
            return Product.objects.filter(id__in=ids)


class ProductSuggestionListView(APIView, PaginationMixin):
    """
    PATH: /api/products/product-suggestion/<product_id>/
    """

    pagination_class = ProductSuggestionPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer = ProductSerializer

    def get(self, request, product_id, format=None):
        queryset = Product.objects.product_suggestion(last_seen_product_id=product_id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(serializer.errors)


class ProductCategoriesListView(APIView):
    """
    PATH: /api/products/categories/
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = ProductGrandParentCategory.objects.all().order_by("id")
        serializer = ProductGrandParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)
