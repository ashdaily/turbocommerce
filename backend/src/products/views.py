from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from utils.pagination import BaseAPIView
from .models import Product, ProductGrandParentCategory
from .serializers import ProductSerializer, ProductGrandParentCategorySerializer


class ProductView(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Product.objects.all().order_by("id")
    serializer = ProductSerializer

    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(serializer.errors)


class ProductGrandParentCategoryView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = ProductGrandParentCategory.objects.all().order_by("id")
        serializer = ProductGrandParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)
