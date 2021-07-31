from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from store.models import StoreInformation
from store.serializers import StoreInformationSerializer


class StoreInformationListView(ListAPIView, CreateAPIView):
    """
    PATH: /api/store/store-information/
    For now we support only single store, so this API will return only
    a single object. We bar the admin from creating multiple entries in
    StoreInformation model.
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StoreInformationSerializer
    queryset = StoreInformation.objects.all()


class StoreInformationDetailView(RetrieveAPIView, DestroyAPIView, UpdateAPIView):
    """
    PATH: /api/store/store-information/<pk>/
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = StoreInformationSerializer
    queryset = StoreInformation.objects.all()
    lookup_field = "id"
