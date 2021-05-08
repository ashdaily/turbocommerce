from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from store.serializers.store import StoreSerializer
from store.models import Store


class StoreListView(APIView):
    """
    PATH: /api/store/
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        queryset = Store.objects.all().order_by("id")
        serializer = StoreSerializer(queryset, many=True)
        return Response(serializer.data)
