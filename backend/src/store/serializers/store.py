from rest_framework.serializers import ModelSerializer

from store.models import Store


class StoreSerializer(ModelSerializer):
    class Meta:
        model = Store
        fields = ["store_name", "store_logo"]
