from pyhustler.pagination import PaginationMixin
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.serializers.product import ProductSerializer
from customer.serializers import CustomerWishlistSerializer
from customer.models import CustomerWishlist
from products.models import Product
from utils.pagination import StandardPagination


class CustomerWishlistView(APIView, PaginationMixin):
    """
    PATH: /api/wishlist/
    """

    permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def get(self, request, *args, **kwargs):
        wishlist = CustomerWishlist.objects.filter(customer=request.user)
        if wishlist.exists():
            products_in_wishlist = list(
                map(lambda product: product.id, wishlist.first().products.all())
            )
            queryset = Product.objects.filter(id__in=products_in_wishlist)
        else:
            queryset = Product.objects.none()

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(serializer.errors)

    def post(self, request, *args, **kwargs):
        payload = request.data.copy()
        payload["customer"] = request.user.id
        serializer = CustomerWishlistSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response({})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
