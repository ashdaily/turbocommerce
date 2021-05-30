from rest_framework.serializers import ModelSerializer

from .models import StoreInformation


class StoreInformationSerializer(ModelSerializer):
    class Meta:
        model = StoreInformation
        fields = ["store_name", "title_tag", "logo", "default_currency"]
