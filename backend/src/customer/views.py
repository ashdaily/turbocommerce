from pyhustler.pagination import PaginationMixin
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.serializers.product import ProductSerializer
from customer.serializers import CustomerWishlistSerializer
from customer.models import CustomerWishlist
from products.models import Product
from utils.pagination import StandardPagination


class CustomerWishlistView(
    generics.CreateAPIView,
    generics.ListAPIView,
    generics.DestroyAPIView,
    PaginationMixin,
):
    """
    PATH: /api/wishlist/
    PATH: /api/wishlist/<pk>/
    """

    permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def create(self, request, *args, **kwargs):
        payload = request.data.copy()
        payload["customer"] = self.request.user.id

        serializer = self.get_serializer(data=payload)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProductSerializer
        else:
            return CustomerWishlistSerializer

    def get_queryset(self):
        wishlist = CustomerWishlist.objects.filter(
            customer=self.request.user
        ).values_list("product", flat=True)
        if wishlist:
            return Product.objects.filter(id__in=wishlist)
        else:
            return Product.objects.none()
