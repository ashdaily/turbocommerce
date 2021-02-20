from django.http import Http404
from pyhustler.pagination import PaginationMixin
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from utils.pagination import StandardPagination, ProductSuggestionPagination
from .models import Product, ProductGrandParentCategory
from .serializers import ProductSerializer, ProductGrandParentCategorySerializer


class ProductListView(ListAPIView, PaginationMixin):
    """
    PATH: /api/products/
    """

    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductsInStockListView(ListAPIView, PaginationMixin):
    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        id_string = self.request.query_params.get("id", None)
        if id_string is not None:
            ids = list(map(int, id_string.split(",")))
            return Product.objects.filter(id__in=ids, quantity_per_unit__gt=0)
        else:
            return Product.objects.none()


class ProductsByIdsListView(ListAPIView, PaginationMixin):
    pagination_class = StandardPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        id_string = self.request.query_params.get("id", None)
        if id_string is not None:
            ids = list(map(int, id_string.split(",")))
            return Product.objects.filter(id__in=ids)
        else:
            return Product.objects.none()


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


class ProductGrandParentCategoryListView(APIView):
    """
    PATH: /api/products/product-grand-parent-category/
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = ProductGrandParentCategory.objects.all().order_by("id")
        serializer = ProductGrandParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)


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
