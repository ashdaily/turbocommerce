from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from utils.pagination import BaseAPIView
from .models import Product, ProductGrandParentCategory
from .serializers import ProductSerializer, ProductGrandParentCategorySerializer


class ProductView(BaseAPIView):
    """
    PATH: /api/products/
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Product.objects.all().order_by("id")
    serializer = ProductSerializer

    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(serializer.errors)


class ProductDetailsView(APIView):
    """
    PATH: /api/products/<id>
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


class ProductGrandParentCategoryView(APIView):
    """
    PATH: /api/products/product-grand-parent-category
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = ProductGrandParentCategory.objects.all().order_by("id")
        serializer = ProductGrandParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)
