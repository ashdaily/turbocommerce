from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "user_type",
            "phone_number",
            "address_pincode",
        )
        depth = 1

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
