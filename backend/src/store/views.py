from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from store.models import StoreInformation
from store.serializers import StoreInformationSerializer


class StoreInformationListView(ListAPIView):
    """
    PATH: /api/store/store-information/
    For now we support only single store, so this API will return only
    a single object. We bar the admin from creating multiple entries in
    StoreInformation model.
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StoreInformationSerializer
    queryset = StoreInformation.objects.all()
