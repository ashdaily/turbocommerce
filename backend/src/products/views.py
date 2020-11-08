from django.http import Http404
from rest_framework.response import Response

from utils.pagination import BaseAPIView
from .models import Product
from .serializers import ProductSerializer


class ProductView(BaseAPIView):
    queryset = Product.objects.all().order_by("id")
    serializer = ProductSerializer

    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(serializer.errors)
